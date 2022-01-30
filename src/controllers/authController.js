//const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../database/db');
const {promisify} = require('util');



// register
exports.register = async (req, res) => {
    try {
        const hashed_pass = await bcryptjs.hash(req.body.password, 8)
        const data = {email: req.body.email, password: hashed_pass};

        db.query('INSERT INTO users SET ?', data, (error, results) => {
            if (error)  throw error;
            res.render('SignUp.html',{title:' - SignUp'})
        });

    } catch (error) {
        console.log(error);
    }
};

// login
exports.login = async (req, res) => {
    try {
        const data = {email: req.body.email, password: req.body.password};
    } catch (error) {
        console.log(error);
    }
}