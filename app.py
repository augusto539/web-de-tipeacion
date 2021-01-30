from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def inex():
   return render_template('index.html')

@app.route('/LogIn')
def LogIn():
   return render_template('LogIn.html', title='LogIn')

@app.route('/Profile', title='Profile')
def Profile():
   pass

if __name__ == "__main__":
    app.run(debug=True, port=4000)