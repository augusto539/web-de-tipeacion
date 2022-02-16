const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b2a77b3794627c',
    password: '6d1eedf4',
    database: 'heroku_7c03fd427a95f7d'
});



connection.connect(error => {
    if (error) throw error;
    console.log('-Database server running-');
});

module.exports = connection