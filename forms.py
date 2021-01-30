from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, length, equal_to, email


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(),length(min=2, max=20) ])

    email = StringField('Email', validators=[DataRequired(), email()])

    password = PasswordField('Pasword', validators=[DataRequired()])

    comfirm_password = PasswordField('Comfirm_Pasword', validators=[DataRequired(), equal_to('password')])

    submit = SubmitField('Sign Up')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), email()])

    password = PasswordField('Pasword', validators=[DataRequired()])

    remember = BooleanField('Remember Me')

    submit = SubmitField('Login')