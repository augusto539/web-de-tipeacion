const express = require('express');
const w = require('../public/js/words.js')
const controllers = require('../controllers/authController')



const router = express.Router();

//const lenguage = 'english';
let all_words = [];
let words = [];

 

// gets
router.get('/', (req, res) => {
    res.render('index.html',{title:'- Loading'});
});

router.get('/home/:language', (req, res) => {
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
        
        res.render('home.html',{title:'', language:req.params.language, text:words, speed:'00', top_speed:'00', errors:'00', wrong_words:'00'});
    });
});
router.get('/home/:language/:speed',(req, res) => {
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
    res.render('home.html',{title:'', language:req.params.language, text:words, speed:req.params.speed, top_speed:'00', errors:'00', wrong_words:'00'});
});

// signUp
router.get('/SignUp', (req, res) => {
    res.render('SignUp.html',{title:' - SignUp'})
});
// logIn
router.get('/LogIn', (req, res) => {
    res.render('logIn.html',{title:' - LogIn'})
});



// POSTS
router.post('/SignUp', controllers.register);



module.exports = router;
