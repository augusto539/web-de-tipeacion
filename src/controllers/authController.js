const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../database/db');
const {promisify} = require('util');

const w = require('../public/js/words.js');
const e = require('../public/js/encryption.js');


//const lenguage = 'english';
let all_words = [];
let words = [];



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









// auxiliar funccions
function homeWords (req,res,user) {
    words = [];
    all_words = [];
    w.get_words(req.params.language).then((value) => {
        all_words = value;

        let words = []

        for (let index = 0; index < 10; index++) {

            for (let i = (index * 100 ); i < ( (index + 1) * 100); i++) {
                words.push(all_words[i])   
            }
            res.cookie(('words_' + index), words);
            words = [];  
        };
        
        const numbers = w.get_numbers();
        numbers.forEach(element => {
            words = no_spaces(all_words,element)
        });
        
        
            
        res.render('home.html',{title:'',user:user , language:req.params.language, text:words, speed:'00', top_speed:'00', errors:'00', correct_words:'00', wrong_words:'00'});
    });
}

function home (req,res,user) {

    let cookie_words = [];
    cookie_words = cookie_words.concat(req.cookies.words_0, req.cookies.words_1, req.cookies.words_2, req.cookies.words_3, req.cookies.words_4, req.cookies.words_5, req.cookies.words_6, req.cookies.words_7, req.cookies.words_8, req.cookies.words_9)
    
    words = [];
    const numbers = w.get_numbers();

    numbers.forEach(element => {
        try{
            words = no_spaces(cookie_words,element);
        } catch(err){
            res.redirect('/');
        }  
    });
    let speed = e.decrypt('holasoyunacontrasenia',req.params.speed)
    let correct_words = e.decrypt('holasoyunacontrasenia',req.params.correct_words)
    let wrong_words = e.decrypt('holasoyunacontrasenia',req.params.wrong_words)
    let errors = e.decrypt('holasoyunacontrasenia',req.params.errors)
    res.render('home.html',{title:'',user:user, language:req.params.language, text:words, speed:speed, top_speed:'00', errors:'00', correct_words:correct_words, wrong_words:wrong_words});
}



function no_spaces(array,element){
    if (array[element] != undefined){
        words.push(array[element]);
    }  else {
        let word = array[element];
        while (word == undefined) {
            let random_number = Math.floor(Math.random() * (1001 - 0)) + 0;
            word = array[random_number];
        };
        words.push(word); 
    };
    return words
}