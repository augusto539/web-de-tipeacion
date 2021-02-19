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

      _stats_ = Statistics(speed = float(info['wpm']), errors = int(info['errors']),time = int(info['time']),Correct_words = int(info['Correct_words']),Wrong_words = int(info['Wrong_words']), Keystrokes = int(info['Keystrokes']), user = current_user)

      db.session.add(_stats_)
      db.session.commit()

   if current_user.is_authenticated:
      last_stats = Statistics.query.filter_by( user_id = current_user.id ).all()
      last_stats = last_stats[-1]
   else:
      last_stats = {'speed': 0, 'errors': 0, 'time': 0, 'Correct_words': 0, 'Wrong_words': 0, 'Keystrokes': 0}

   return render_template('index.html', _words_=json.dumps(_Words_), last_stats=last_stats)


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
   username = current_user.username
   stats = Statistics.query.filter_by( user_id = current_user.id ).all()

   speeds=[]
   errors=[]
   times=0

   for individual_stat in stats:
      speeds.append(individual_stat.speed)
      errors.append(individual_stat.errors)
      
      times += individual_stat.time

   seconds=(times/1000)%60
   seconds = int(seconds)
   minutes=(times/(1000*60))%60
   minutes = int(minutes)
   hours=(times/(1000*60*60))%24

   total_time = "%d:%d:%d" % (hours, minutes, seconds)

   average_errors = round(sum(errors) / len(errors), 2)
   average_speeds = round(sum(speeds) / len(speeds), 2)
   max_speed = max(speeds)

   return render_template('Profile.html', title = f'- {username}',average_speeds=average_speeds,max_speed=max_speed,total_time=total_time,average_errors=average_errors)


@app.route('/data_base')
def data_base():

   fill_database(Words)
   return '<h1> this is the pruebas route </h1>'


