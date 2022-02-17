//REQUIRES
const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path');
const bodyParser = require('body-parser')
const favicon = require('serve-favicon');
//const os = require('os')
// VARIABLES
const app = express();
// SETINGS
app.set('port', process.env.PORT || 3000);
//app.set('hostname', os.networkInterfaces()['Ethernet 2'][1]['address']); //get the ipv4 of the sistem
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
// MIDDLEWARES
app.use(favicon('src/public/img/icon.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config({path: 'src/env/.env'});
app.use(require('./routes/index'));
app.use(express.static(path.join(__dirname, 'public')))
// LISTENING THE SERVER
//app.listen(app.get('port'),app.get('hostname') , () => console.log(`Server runing at http://${app.get('hostname')}:${app.get('port')}/`));
app.listen(app.get('port') , () => console.log(`Server runing on port: ${app.get('port')}`));
