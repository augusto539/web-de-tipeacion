const express = require('express');
const w = require('../public/js/words.js')


const router = express.Router();

//const lenguage = 'english';
let all_words = [];
let words = [];

 

// gets
router.get('/', (req, res) => {
    /*
    w.get_words(lenguage).then((value) => {
        all_words = value
        const numbers = w.get_numbers();
        numbers.forEach(element => {
            words.push(all_words[element])
        });
        
    });
    */
    res.render('index.html');
});

router.get('/home/:language', (req, res) => {
    words = [];
    all_words = [];
    w.get_words(req.params.language).then((value) => {
        all_words = value
        const numbers = w.get_numbers();
        numbers.forEach(element => {
            words.push(all_words[element])
        });
        
        res.render('home.html',{title:'',text:words});
    });
});
router.get('/home',(req, res) => {
    words = [];
    const numbers = w.get_numbers();
    numbers.forEach(element => {
        words.push(all_words[element])
    });
    res.render('home.html',{title:'',text:words});
})



module.exports = router;