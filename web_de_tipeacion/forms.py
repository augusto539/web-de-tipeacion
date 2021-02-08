from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, length, equal_to, email, ValidationError
from web_de_tipeacion.models import User


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(),length(min=2, max=20)], render_kw={"placeholder": "Username"})

    email = StringField('Email', validators=[DataRequired(), email()], render_kw={"placeholder": "Email"})

    password = PasswordField('Pasword', validators=[DataRequired(),length(min=4, max=20)], render_kw={"placeholder": "Password"})

    comfirm_password = PasswordField('Comfirm_Pasword', validators=[DataRequired(), equal_to('password')], render_kw={"placeholder": "Comfirm Password"})

    submit = SubmitField('Sign Up')

    def validate_username(self, username):

        user = User.query.filter_by(username=username.data).first()

        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):

        user = User.query.filter_by(email=email.data).first()

        if user:
            raise ValidationError('That email is taken. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), email()], render_kw={"placeholder": "Email"})

    password = PasswordField('Pasword', validators=[DataRequired()], render_kw={"placeholder": "Password"})

    remember = BooleanField('Remember Me')

    submit = SubmitField('Login')