const express = require('express');
//const controllers = require('../controllers/authController')

const w = require('../public/js/words.js');
const e = require('../public/js/encryption.js');


//const lenguage = 'english';
let all_words = [];
let words = [];



const router = express.Router();



 

// gets
router.get('/', (req, res) => {
    res.render('index.html',{title:'- Loading'});
});

//router.get('/home/:language', controllers.home_new_words);
//router.get('/home/:language/:speed/:correct_words/:wrong_words/:errors',controllers.home);

router.get('/home/:language', (req,res) => {
    homeWords(req,res,'guest')
});

router.get('/home/:language/:speed/:correct_words/:wrong_words/:errors', (req,res) => {
    home(req,res,'guest')
});

// signUp
router.get('/SignUp', (req, res) => {
    res.render('SignUp.html',{title:' - SignUp', alert_tipe:'', mesage:''})
});
// logIn
router.get('/LogIn', (req, res) => {
    res.render('logIn.html',{title:' - LogIn', alert_tipe:'', mesage:''})
});
/*
// LogOut
router.get('/LogOut', controllers.logout);



// POSTS
router.post('/SignUp', controllers.register);

router.post('/LogIn', controllers.login);

*/
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
};

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
module.exports = router;
