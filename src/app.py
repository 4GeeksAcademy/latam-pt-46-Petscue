"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from flask_mail import Mail, Message
from flask import render_template
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from api.models import db, User, UserRole, Animal




# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JTW_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=150) #tiempo de expiracion del token
jwt = JWTManager(app)


#Flask mail config
app.config.update(dict(
    DEBUG=False,
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
))
mail = Mail(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Endpoint to send an contact email ##############################################################
@app.route("/send-email/contact/<int:user_id>", methods=["POST"]) #id del usuario a quien se le enviara el email
@jwt_required()
def send_email(user_id): 
    current_user_id = get_jwt_identity() #el adoptante
    current_user = User.query.get(current_user_id)
    if not current_user:
        return jsonify({"message": "Unauthorized"}), 401
    user = User.query.get(user_id) #el que tiene el animalito
    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.get_json()
    message = data.get("message", "") #por los mometos tiene un solo field ojo agregar lo otro
    html_body = render_template( 
        "contact_email.html", #hace rreferencia a la plantilla en templates carpeta --> si cambias tem qu ehcambiar aca tmb
        user_email=user.email, #destinatario
        sender_email=current_user.email, # el qie lo manda
        message=message #mendaje que 
    )
    print(html_body) #para corroborar
    
    msg = Message(
        subject="Nuevo mensaje de contacto",
        recipients=[user.email],
        html=html_body,
        sender=current_user.email
    )
    mail.send(msg)
    return jsonify({"message": "Email sent"}), 200



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
