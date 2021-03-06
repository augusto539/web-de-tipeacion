from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '2a27b8563e40cf05fbd76cbc7f8bd4f6'
app.config['SQLALCHEMY_DATABASE_URI']  = 'sqlite:///database.db'
db = SQLAlchemy(app)
bycrypt = Bcrypt(app)
Login_manager = LoginManager(app)


from web_de_tipeacion import routes