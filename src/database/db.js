const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bb991aa9ee14ec',
    password: '11f993b4',
    database: 'heroku_b0b210df1761f92'
});

//mysql://bb991aa9ee14ec:11f993b4@us-cdbr-east-05.cleardb.net/heroku_b0b210df1761f92?reconnect=true

connection.connect(error => {
    if (error) throw error;
    console.log('-Database server running-');
});

module.exports = connection