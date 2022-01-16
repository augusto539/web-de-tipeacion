const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')


const app = express();

// SETINGS
app.set('port', 3000);
app.set('hostname', '192.168.1.36');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// ROUTES
app.use(require('./routes/index'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))

// LISTENING THE SERVER
app.listen(app.get('port'),app.get('hostname') , () => console.log(`Server runing at http://${app.get('hostname')}:${app.get('port')}/`));