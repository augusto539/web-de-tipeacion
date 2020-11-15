from wtforms import Form, StringField, PasswordField
from wtforms.fields.html5 import EmailField

class forms(Form):
    username = StringField()
    pasword = PasswordField()
    e_mail = EmailField()