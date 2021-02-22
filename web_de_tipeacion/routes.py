from flask import render_template, url_for, flash, redirect, json, request
from web_de_tipeacion import app, db, bycrypt
from web_de_tipeacion.forms import RegistrationForm, LoginForm
from web_de_tipeacion.models import User, Statistics, Words
from flask_login import login_user, current_user, logout_user
from datetime import datetime

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
   home="is_active"

   if request.method == 'POST':

      info = json.loads(request.data)

      _stats_ = Statistics(speed = float(info['wpm']), errors = int(info['errors']),time = int(info['time']),Correct_words = int(info['Correct_words']),Wrong_words = int(info['Wrong_words']), Keystrokes = int(info['Keystrokes']), user = current_user)

      db.session.add(_stats_)
      db.session.commit()

   if current_user.is_authenticated:
      last_stats = Statistics.query.filter_by( user_id = current_user.id ).all()

      try:
         last_stats = last_stats[-1]
      except IndexError:
         last_stats = {'speed': 0, 'errors': 0, 'time': 0, 'Correct_words': 0, 'Wrong_words': 0, 'Keystrokes': 0}
   else:
      last_stats = {'speed': 0, 'errors': 0, 'time': 0, 'Correct_words': 0, 'Wrong_words': 0, 'Keystrokes': 0}

   return render_template('index.html',home="is_active" , _words_=json.dumps(_Words_), last_stats=last_stats)


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
   return render_template('SignUp.html',SignUp="is_active", title='- SignUp', form=form)



@app.route('/LogIn', methods=['GET','POST'])
def LogIn():
   LogIn="is_active"

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

   return render_template('LogIn.html',LogIn=LogIn, title='- LogIn', form=form)


@app.route('/LogOut')
def LogOut():
   logout_user()
   return redirect(url_for('home'))


@app.route('/Profile')
def Profile():
   Profile="is_active"

   # all time
   stats = Statistics.query.filter_by( user_id = current_user.id ).all()
   all_time = Stats(stats)
  

   # today
   stats = Statistics.query.filter_by( user_id = current_user.id, date=datetime.today().strftime("%d/%m/%Y") ).all()
   today = Stats(stats)


   return render_template('Profile.html',Profile=Profile, title = f'- {current_user.username}',all_time=all_time,today=today,user=current_user.username)


@app.route('/Stats')
def user_stats():
   user_stats="is_active"

   return "this is the stats route"
   

@app.route('/data_base')
def data_base():

   fill_database(Words)
   return '<h1> this is the fil database route </h1>'


@app.route('/new_navigation')
def new_navigation():
   return render_template('index_2.html')



def Stats(stats):
   speeds=[]
   errors=[]
   times=0

   for individual_stat in stats:
      speeds.append(individual_stat.speed)
      errors.append(individual_stat.errors)
      
      times += individual_stat.time

   #print(speeds)

   try:
      max_speed = max(speeds)

      seconds=(times/1000)%60
      seconds = int(seconds)
      minutes=(times/(1000*60))%60
      minutes = int(minutes)
      hours=(times/(1000*60*60))%24

      return_diccionari = {'max_speed': max_speed, 'average_speeds':round(sum(speeds) / len(speeds), 2),'total_time': "%d:%d:%d" % (hours, minutes, seconds),'average_errors':round(sum(errors) / len(errors), 2)}
   except ValueError:
      return_diccionari = {'max_speed': 0, 'average_speeds':0,'total_time': 0,'average_errors':0}



      
      

   return return_diccionari