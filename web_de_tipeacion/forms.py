from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, length, equal_to, email


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(),length(min=2, max=20)], render_kw={"placeholder": "Username"})

    email = StringField('Email', validators=[DataRequired(), email()], render_kw={"placeholder": "Email"})

    password = PasswordField('Pasword', validators=[DataRequired(),length(min=4, max=20)], render_kw={"placeholder": "Password"})

    comfirm_password = PasswordField('Comfirm_Pasword', validators=[DataRequired(), equal_to('password')], render_kw={"placeholder": "Comfirm Password"})

    submit = SubmitField('Sign Up')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), email()], render_kw={"placeholder": "Email"})

    password = PasswordField('Pasword', validators=[DataRequired()], render_kw={"placeholder": "Password"})

    remember = BooleanField('Remember Me')

    submit = SubmitField('Login')