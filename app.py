from flask import Flask, render_template, url_for, flash, redirect
from forms import RegistrationForm, LoginForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '2a27b8563e40cf05fbd76cbc7f8bd4f6'

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


if __name__ == "__main__":
    app.run(debug=True, port=4000)