from flask import Flask
from flask import render_template
from flask import request

import form

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/logIn/', methods=['GET', 'POST'])
def logIn():
    logIn_form = form.forms(request.form)
    if request.method == 'POST' and logIn_form.validate():
        print (logIn_form.username.data)
        print (logIn_form.pasword.data)

    return render_template('logIn.html', form = logIn_form)


@app.route('/singIn/', methods=['GET', 'POST'])
def singIn():
    singIn_form = form.forms(request.form)
    if request.method == 'POST':
        print (singIn_form.username.data)
        print (singIn_form.pasword.data)
        print (singIn_form.e_mail.data)

    return render_template('singIn.html', form = singIn_form)



if __name__ == '__main__':
    app.run(debug = True, port= 8000)