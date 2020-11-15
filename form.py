from wtforms import Form, StringField, PasswordField
from wtforms.fields.html5 import EmailField
from wtforms import validators

class forms(Form):
    username = StringField('username',
                            [
                                validators.Required(message='el usuario es requerido'),
                                validators.length(min=4, max=25, message='prueva de color/ ingreda un usuario valido')
                            ] 
                            )
    pasword = PasswordField('pasword')
    e_mail = EmailField('e_mail')
