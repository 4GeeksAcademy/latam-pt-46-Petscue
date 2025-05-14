"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.dataStructure import AllTheUsers
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bcrypt import gensalt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/newUser', methods=['POST'])
def a_new_user():
    data = request.json

    # Verificar que nos envien todos los datos
    required_fields = ["email", "password", "phone", "first_name", "last_name"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "All fields are required: email, password, phone, first_name, last_name"}), 400

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
        is_active=True,
        password=password_hash,
        salt=salt
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
    if password_is_valid == False:
        return jsonify({"message": "invalid credentials"}), 400
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token}), 201
