from flask import render_template, url_for, flash, redirect
from web_de_tipeacion import app
from web_de_tipeacion.forms import RegistrationForm, LoginForm
from web_de_tipeacion.models import User, Statistics


@app.route('/')
def index():
   return render_template('index.html')


@app.route('/SignUp', methods=['GET','POST'])
def SignUp():
   form = RegistrationForm()
   if form.validate_on_submit():
      flash(f'Accout createed for {form.username.data}!','success')
      return redirect(url_for('index'))
   return render_template('SignUp.html', title='- SignUp', form=form)


@app.route('/LogIn', methods=['GET','POST'])
def LogIn():
   form = LoginForm()
   if form.validate_on_submit():
      if form.email.data == 'admin@admin.com' and form.password.data == 'password':
         flash('You have been logged in!', 'success')
         return redirect(url_for('index'))
      else:
         flash('Login unsuccessful. Please check username and password', 'danger')
   return render_template('LogIn.html', title='- LogIn', form=form)


@app.route('/Profile')
def Profile():
   pass


@app.route('/pruebas')
def pruebas():
   return render_template('prueba.html')


