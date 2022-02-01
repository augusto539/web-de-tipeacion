const express = require('express');
const controllers = require('../controllers/authController')



const router = express.Router();

//const lenguage = 'english';
let all_words = [];
let words = [];

 

// gets
router.get('/', (req, res) => {
    res.render('index.html',{title:'- Loading'});
});

router.get('/home/:language', controllers.home_new_words);

router.get('/home/:language/:speed',controllers.home);

// signUp
router.get('/SignUp', (req, res) => {
    res.render('SignUp.html',{title:' - SignUp', alert_tipe:'', mesage:''})
});
// logIn
router.get('/LogIn', (req, res) => {
    res.render('logIn.html',{title:' - LogIn', alert_tipe:'', mesage:''})
});
// LogOut
router.get('/LogOut', controllers.logout);



// POSTS
router.post('/SignUp', controllers.register);

router.post('/LogIn', controllers.login);




module.exports = router;
