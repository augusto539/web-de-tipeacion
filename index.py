from flask import Flask
from flask import render_template

from form import Imput

app = Flask(__name__)

@app.route('/')
def index():

    text_imput = Imput()
    
    texto = "hola como estas este es un texto de prueva sin puntuaciones"

    Speed = "50 WPM"
    Errors = "20"
    Correct_words = "40"
    Wrong_words = "7"
    Keystrokes = "2"

    return render_template('index.html', texto= texto, form=text_imput, Keystrokes=Keystrokes, Wrong_words=Wrong_words, Correct_words=Correct_words, Errors=Errors, Speed=Speed)

if __name__ == '__main__':
    app.run(debug = True, port= 8000)