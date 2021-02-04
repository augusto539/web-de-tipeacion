from web_de_tipeacion import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    stats = db.relationship('Statistics', backref='user', lazy=True)


class Statistics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    speed = db.Column(db.Float, nullable=False)
    errors = db.Column(db.Float, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
