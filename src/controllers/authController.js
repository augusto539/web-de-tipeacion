const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../database/db');
const {promisify} = require('util');

const w = require('../public/js/words.js')



// register
exports.register = async (req, res) => {
    try {
        const hashed_pass = await bcryptjs.hash(req.body.password, 8);
        const data = {email: req.body.email, password: hashed_pass};

        if (!req.body.email || !req.body.password) {
            res.render('SignUp.html',{title:' - SignUp', alert:"show", alert_tipe:'warning', mesage:'Plese fill all the camps'})
        } else {
            db.query('SELECT * FROM users WHERE email = ?', [data.email], (error, results) => {
                if (error)  throw error;
    
                if (results.length != 0) {
                    res.render('SignUp.html',{title:' - SignUp', alert:"show", alert_tipe:'danger', mesage:`The email: ${data.email} <b>already exists</b>`})
                } else {
                    db.query('INSERT INTO users SET ?', data, (error, results) => {
                        if (error)  throw error;
                        res.redirect('/');
                    });
                };
            });
        };        
    } catch (error) {
        console.log(error);
    }
};

// login
exports.login = async (req, res) => {
    try {
        const data = {email: req.body.email, password: req.body.password};

        if (!req.body.email || !req.body.password) {
            res.render('logIn.html',{title:' - SignUp', alert:"show", alert_tipe:'warning', mesage:'Plese fill all the camps'});
        } else {
            db.query('SELECT * FROM users WHERE email = ? ', [data.email], async (error, results) => {
                if (error)  throw error;

                if (results.length == 0) {
                    res.render('logIn.html',{title:' - SignUp', alert:"show", alert_tipe:'danger', mesage:'The email is invalid'});
                } else {
                    if (! await bcryptjs.compare(data.password, results[0].password)) {
                        res.render('logIn.html',{title:' - SignUp', alert:"show", alert_tipe:'danger', mesage:'The password is invalid'});
                    } else{

                        const id = results[0].id;
                        const token = jwt.sign({id:id}, process.env.JWT_SECRET);

                        
                        const cookiesOptions = {
                            expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        res.cookie('jwt', token, cookiesOptions);
                        res.redirect('/');
                    };
                };
            });
        };      
    } catch (error) {
        console.log(error);
    };
};

//autenticacion
exports.isAuthenticated_1 = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id],(error, results) => {
                if (!results) {return next()};
                req.user = results[0];
                return next();
            });
        } catch (error) {
            console.log(error)
            return next()
        };
    } else {
        res.redirect('/LogIn');
    };
};

exports.home_new_words = async (req, res) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id],(error, results) => {
                if (!results) {return next()};
                req.user = results[0];
                homeWords(req,res,decoded.id)
            });
        } catch (error) {
            console.log(error)
            homeWords(req,res,'guest')
        };
    } else {
        homeWords(req,res,'guest')
    };
};

exports.home = async (req, res) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id],(error, results) => {
                if (!results) {return next()};
                req.user = results[0];
                home(req,res,decoded.id)
            });
        } catch (error) {
            console.log(error)
            home(req,res,'guest')
        };
    } else {
        home(req,res,'guest')
    };
};

//logout
exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}




function homeWords (req,res,user) {
    words = [];
    all_words = [];
    w.get_words(req.params.language).then((value) => {
        all_words = value
        const numbers = w.get_numbers();
        numbers.forEach(element => {
            if (all_words[element].includes(' ')){
                random_number = Math.floor(Math.random() * (1001 - 0)) + 0;
                words.push(all_words[random_number]);
            } else {
                words.push(all_words[element]);
            }
        });
            
        res.render('home.html',{title:'',user:user , language:req.params.language, text:words, speed:'00', top_speed:'00', errors:'00', wrong_words:'00'});
    });
}

function home (req,res,user) {
    words = [];
    const numbers = w.get_numbers();
    numbers.forEach(element => {
        try{
            if (all_words[element].includes(' ')){
                random_number = Math.floor(Math.random() * (1001 - 0)) + 0;
                words.push(all_words[random_number]);
            } else {
                words.push(all_words[element]);
            }
        } catch(err){
            res.redirect('/');
        }  
    });
    res.render('home.html',{title:'',user:user, language:req.params.language, text:words, speed:req.params.speed, top_speed:'00', errors:'00', wrong_words:'00'});
}