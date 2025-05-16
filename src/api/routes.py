"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserRole
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.dataStructure import AllTheUsers
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bcrypt import gensalt
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from datetime import datetime


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


@api.route('/newUser', methods=['POST'])
def a_new_user():
    data = request.json

    # Verificar que nos envien todos los datos
    required_fields = ["email", "password",
                       "phone", "first_name", "last_name", "role"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password, phone, first_name, last_name, role"}), 400

    role_str = data.get("role", "").lower()
    if role_str not in UserRole._value2member_map_:
        return jsonify({"message": "Invalid role. Must be 'admin', 'adopter', or 'rescuer'."}), 400

    # Validar que sólo el admin pueda crear usuarios con rol admin
    role_str = data.get("role", "").lower()
    if role_str == "admin":
        return jsonify({"message": "Only admins can create users with admin role"}), 403

    # Si el usuario no es admin y quiere crear un rol diferente a adopter o rescuer
    if role_str not in ("adopter", "rescuer"):
        return jsonify({"message": "You can only register as adopter or rescuer"}), 403

    # Verificar que si el email existe
    user_exists = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user_exists is not None:
        return jsonify({"message": "Can't create new user"}), 400

    # hashear la contraseña
    password = data.get("password")
    salt = str(gensalt(), encoding='utf-8')
    password_hash = generate_password_hash(salt + password)

    user = User(
        email=data["email"],
        phone=data["phone"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        password_hash=password_hash,
        salt=salt,
        role=UserRole(role_str),
        start_date=datetime.utcnow(),
        is_active=True
    )

    db.session.add(user)

    try:
        db.session.commit()
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"message": "Internal server error"}), 500
    return jsonify({
        "user": user.serialize()
    }), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json

    # Verificar que nos envien todos los datos
    required_fields = ["email", "password"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password"}), 400

    # Verificar que si el email existe
    user = db.session.execute(
        db.select(User).filter_by(email=data["email"])).scalar_one_or_none()
    if user is None:
        return jsonify({"message": "Can't login"}), 400

    salt = user.salt
    login_password = data["password"]

    # hashear contraseña
    password_is_valid = check_password_hash(
        user.password_hash, salt + login_password)

    # verificar que la contraseña coincida
    if not password_is_valid:
        return jsonify({"message": "invalid credentials"}), 400

    token = create_access_token(
        identity={"id": user.id, "role": user.role.value})
    return jsonify({"token": token}), 201

# rescatistas para guardar animalitos en la db


@api.route('/animals', methods=['POST'])
@jwt_required()
def create_animal():
    data = request.json
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or user.role.value != 'rescuer':
        return jsonify({"msg": "No estas autorizado para realizar esta accion de subir animalitos a la plataforma"}), 403

    animal = Animal(
        name=data['name'],
        age=data['age'],
        animal_type=data['animal_type'],
        race=data['race'],
        photo=data.get('photo'),
        color=data['color'],
        vaccines=data.get('vaccines'),
        rescuer_id=current_user_id
    )
    db.session.add(animal)
    db.session.commit()
    return jsonify(animal.serialize()), 201
