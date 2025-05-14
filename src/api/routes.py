"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.dataStructure import AllTheUsers

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

members = AllTheUsers()

@api.route('/newUser', methods=['POST'])
def a_new_user():
    request_body: request.json
    if "first_name" not in request_body or request_body["first_name"] is None or request_body["first_name"] == "" :
        return jsonify({"message": "Data error"})
    
    elif "last_name" not in request_body or request_body["last_name"] is None or request_body["last_name"] == "" :
        return jsonify({"message": "Data error"})
        
    elif "email" not in request_body or request_body["email"] is None or request_body["email"] == "" :
        return jsonify({"message": "Data error"})
    
    elif "phone" not in request_body or request_body["phone"] is None or request_body["phone"] == "" :
        return jsonify({"message": "Data error"})
    
    elif "password" not in request_body or request_body["password"] is None or request_body["password"] == "" :
        return jsonify({"message": "Data error"})
    
    else:
        new_member = members.append(request_body)

        return jsonify(new_member), 201
