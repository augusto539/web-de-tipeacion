from flask import render_template, url_for, flash, redirect, json, request
from web_de_tipeacion import app, db, bycrypt
from web_de_tipeacion.forms import RegistrationForm, LoginForm
from web_de_tipeacion.models import User, Statistics, Words
from flask_login import login_user, current_user, logout_user

import json

from web_de_tipeacion.web_driver import fill_database

_Words_ = []

@app.route('/')
def index():
   words = Words.query.filter_by(lenguage='English').all()
   for word in words:
      words_dictionari = {'word': word.word}
      _Words_.append(words_dictionari)
      
   return redirect(url_for('home'))
   

@app.route('/home', methods=['GET','POST'])
def home():
   if request.method == 'POST':
      info = json.loads(request.data)

      #stats = Statistics(speed=float(info['wpm']), errors=int(info['errors']), time=int(info['time']))

   return render_template('index.html', _words_=json.dumps(_Words_))


@app.route('/SignUp', methods=['GET','POST'])
def SignUp():
   if current_user.is_authenticated:
      return redirect(url_for('home'))
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
   if current_user.is_authenticated:
      return redirect(url_for('home'))
   form = LoginForm()
   if form.validate_on_submit():
      user = User.query.filter_by(email=form.email.data).first()

      if user and bycrypt.check_password_hash(user.password, form.password.data):
         login_user(user, remember=form.remember.data)
         return redirect(url_for('home'))
      else:   
         flash('Login unsuccessful. Please check email and password', 'danger')

   return render_template('LogIn.html', title='- LogIn', form=form)


@app.route('/LogOut')
def LogOut():
   logout_user()
   return redirect(url_for('home'))


@app.route('/Profile')
def Profile():
   pass


@app.route('/data_base')
def data_base():

   fill_database(Words)
   return '<h1> this is the pruebas route </h1>'


