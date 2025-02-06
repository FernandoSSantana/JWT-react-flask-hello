"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/register', methods=['POST'])
# def register_user():
#     data = request.get_json()
    
#     if not data:
#         return jsonify({"error": "Datos no recibidos"}), 400

#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Todos los campos son obligatorios"}), 400

#     # Hashear la contraseña antes de guardarla
#     hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#     # Crear usuario
#     new_user = User(email=email, password=hashed_password)
    
#     try:
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify({"message": "Usuario registrado con éxito"}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
    

@api.route('/create', methods=['POST'])
def create_user():
    user_data = request.get_json()
    new_user = User(**user_data)
    new_user.password = bcrypt.generate_password_hash(new_user.password).decode('utf-8')
    print(new_user.password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuario creado"}), 201

@api.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    user = User.query.filter_by(email=user_data["email"]).first()
    if user and bcrypt.check_password_hash(user.password, user_data["password"]):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg":"Login efectuado con exito","access_token":access_token})
    else:
        return jsonify({"error":"email o contraseña incorrectos"})
    
@api.route('/get', methods=['GET'])
@jwt_required()
def get_all_user():
    user_list = User.query.all()
    user_list = [user.serialize() for user in user_list]
    return jsonify({"user_list":user_list})