from flask import render_template, url_for, flash, redirect, json
from web_de_tipeacion import app, db, bycrypt
from web_de_tipeacion.forms import RegistrationForm, LoginForm
from web_de_tipeacion.models import User, Statistics, Words
from flask_login import login_user

from web_de_tipeacion.web_driver import fill_database

_Words_ = []

@app.route('/')
def index():
   words = Words.query.filter_by(lenguage='English').all()
   for word in words:
      words_dictionari = {'word': word.word}
      _Words_.append(words_dictionari)
      
   return redirect(url_for('home'))
   

@app.route('/home')
def home():
   return render_template('index.html', _words_=json.dumps(_Words_))


@app.route('/SignUp', methods=['GET','POST'])
def SignUp():
   form = RegistrationForm()
   if form.validate_on_submit():

      hashed_password = bycrypt.generate_password_hash(form.password.data).decode('utf-8')
      user = User(username=form.username.data, email=form.email.data, password=hashed_password)

      db.session.add(user)
      db.session.commit()

      flash(f'your account has been created! you are now able to log in','success')
      return redirect(url_for('LogIn'))
   return render_template('SignUp.html', title='- SignUp', form=form)



@app.route('/LogIn', methods=['GET','POST'])
def LogIn():
   form = LoginForm()
   if form.validate_on_submit():
      user = User.query.filter_by(email=form.email.data).first()

      if user and bycrypt.check_password_hash(user.password, form.password.data):
         login_user(user, remember=form.remember.data)
         return redirect(url_for('index'))
      else:   
         flash('Login unsuccessful. Please check email and password', 'danger')

   return render_template('LogIn.html', title='- LogIn', form=form)


@app.route('/Profile')
def Profile():
   pass


@app.route('/data_base')
def data_base():

   fill_database(Words)
   return '<h1> this is the pruebas route </h1>'


