const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DM_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DE_DATABASE
});

connection.connect(error => {
    if (error) throw error;
    console.log('-Database server running-');
});

module.exports = connection