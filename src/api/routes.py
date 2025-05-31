"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserRole, Animal, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.dataStructure import AllTheUsers
from flask_jwt_extended import create_access_token,  jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from werkzeug.security import generate_password_hash, check_password_hash
from bcrypt import gensalt
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from datetime import datetime
import traceback


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def role_required(*allowed_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()  # Verifica que el token JWT esté presente y válido
            claims = get_jwt()
            user_role = claims.get("role", None)
            if user_role not in allowed_roles:
                return jsonify({"msg": "Access denied. Insufficient permissions."}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper


@api.route('/user', methods=['POST'])
def a_new_user():
    data = request.json

    # Verify that they send us all the data

    required_fields = ["email", "password",
                       "phone", "first_name", "last_name", "role", "story"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password, phone, first_name, last_name, role, story"}), 400

    role_str = data.get("role", "").upper()
    if role_str not in UserRole.__members__:
        return jsonify({"message": "Invalid role. Must be ADMIN, ADOPTER, RESCUER, or OWNER"}), 400

    # Validate that only the admin can create users with admin role
    if role_str == "ADMIN":
        return jsonify({"message": "Only admins can create users with admin role"}), 403

    # If the user is not admin and wants to create a different role to adopt or resign
    if role_str not in ("ADOPTER", "RESCUER", "OWNER"):
        return jsonify({"message": "You can only register as adopter, rescuer or owner"}), 403

    # Verify that if the email exists
    user_exists = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user_exists is not None:
        return jsonify({"message": "Can't create new user"}), 400

    # havehear the password
    password = data.get("password")
    salt = str(gensalt(), encoding='utf-8')
    password_hash = generate_password_hash(salt + password)

    user = User(
        email=data["email"],
        phone=data["phone"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        story=data["story"],
        password_hash=password_hash,
        salt=salt,
        role=UserRole[role_str],
        start_date=datetime.utcnow(),
        is_active=True
    )

    db.session.add(user)

    try:
        db.session.commit()
    except Exception as error:
        print("ERROR TO CREATE USER:")
        traceback.print_exc()  # This prints the entire error trace
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500
    return jsonify({
        "user": user.serialize()
    }), 201


@api.route('/auth/login', methods=['POST'])
def login():
    data = request.json

    # Verify that they send us all the data
    required_fields = ["email", "password"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password"}), 400

    # Verify that if the email exists
    user = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user is None:
        return jsonify({"message": "Can't login"}), 400

    salt = user.salt
    login_password = data["password"]

    # hashear password
    password_is_valid = check_password_hash(
        user.password_hash, salt + login_password)

    # verify that the password matches
    if not password_is_valid:
        return jsonify({"message": "invalid credentials"}), 400

    token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role.name})
    return jsonify({
        "token": token,
        "role": user.role.name
    }), 201

# rescuers to store animals in the db


@api.route('/animals', methods=['POST'])
@jwt_required()
def create_animal():
    data = request.json
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    if not user or user.role.value not in ['RESCUER', 'OWNER']:
        return jsonify({"msg": "You are not authorized to upload animals to the platform"}), 403

    # Create the dictionary to then prepare it to put ti together with the user role
    animal_data = {
        "name": data["name"],
        "age": data["age"],
        "animal_type": data["animal_type"],
        "race": data["race"],
        "photo": data.get("photo", ""),
        "color": data["color"],
        "vaccines": data.get("vaccines"),
        "description": data["description"]
    }
    # Adding the id to the animal data

    animal_data["added_by_id"] = current_user_id

    # putting everything together
    animal = Animal(**animal_data)
    db.session.add(animal)
    db.session.commit()
    return jsonify(animal.serialize()), 201
# todos los animales -->  /users/animals
# por usuario
# /users/el-Id#/animals

@api.route('/animals', methods=['GET'])
def get_the_animal():
    try:
        animals = Animal.query.all()
        animals_list = [animal.serialize() for animal in animals]       
        return jsonify({"animals": animals_list}), 200
    except Exception as e:
        
        print(f"Error al obtener animales: {e}")
        return jsonify({"msg": "Error interno del servidor al obtener animales"}), 500

@api.route('/animals/my-animals', methods=['GET'])
@jwt_required()
def get_my_animals():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    if not user or user.role.value not in ['RESCUER', 'OWNER']:
        return jsonify({"msg": "Only Rescuers and owners can access this route"}), 403

    animals = []

    animals = Animal.query.filter_by(added_by_id=current_user_id).all()

    animals_list = [animal.serialize() for animal in animals]
    return jsonify({"animals": animals_list}), 200


@api.route('/animals_rescued', methods=['GET'])
def get_animals():
    # Filtrar animales agregados por usuarios con rol 'OWNER' o 'RESCUER'
    animals = Animal.query.join(User).filter(
        User.role.in_(['OWNER', 'RESCUER'])).all()

    animals_list = [animal.serialize() for animal in animals]
    return jsonify({"animals": animals_list}), 200


@api.route('/private', methods=["GET"])
@jwt_required()
@role_required('ADMIN', 'ADOPTER', 'RESCUER', 'OWNER')
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({
            "message": f"User access with ID: {current_user_id}",
            "user_data": user.serialize()
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


@api.route("/favorites", methods=["GET"])
def get_user_favorites():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
    except NoAuthorizationError:
        user_id = None

    if user_id:
        favorites = Favorite.query.filter_by(user_id=user_id).all()
        favorite_animal_ids = [fav.animal_id for fav in favorites]
    else:
        favorite_animal_ids = []

    return jsonify(favorite_animal_ids), 200


@api.route("/favorites/<int:animal_id>", methods=["POST"])
@jwt_required()
def toggle_favorite(animal_id):
    user_id = get_jwt_identity()
    favorite = Favorite.query.filter_by(
        user_id=user_id, animal_id=animal_id).first()

    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "Removed from favorites"}), 200
    else:
        new_favorite = Favorite(user_id=user_id, animal_id=animal_id)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"msg": "Added to favorites"}), 201


@api.route("/animal/<int:animal_id>", methods=["GET"])
def get_animal_description(animal_id):
    animal = Animal.query.get(animal_id)

    if not animal:
        return jsonify({"msg": "Animal not found"}), 404

    return jsonify(animal.serialize()), 200
