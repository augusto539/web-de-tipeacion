from web_de_tipeacion import db, Login_manager
from flask_login import UserMixin
from datetime import datetime


@Login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    lenguage = db.Column(db.String(), default='English')
    stats = db.relationship('Statistics', backref='user', lazy=True)


class Statistics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    speed = db.Column(db.Float, nullable=False)
    errors = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    Correct_words = db.Column(db.Integer, nullable=False)
    Wrong_words = db.Column(db.Integer, nullable=False)
    Keystrokes = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String, nullable=False, default=datetime.today().strftime("%d/%m/%Y"))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Words(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String, unique=True, nullable=False)
    lenguage = db.Column(db.String(), nullable=False)

