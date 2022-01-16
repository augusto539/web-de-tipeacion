// VARIABLES

//time
let time_1, time_2, time_3  = 0;;
let wpm = 0;

//characters
var result = '';
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;





function color(current_word,Words,number_of_words){
    if (current_word == Words[number_of_words]){
        document.getElementById(number_of_words).className = 'correct_word';
        document.getElementById('line').className = 'correct_line';
    } else {
        document.getElementById(number_of_words).className = 'incorrect_word';
        document.getElementById('line').className = 'incorrect_line';
    }
}


function time(number_of_words){
    if (number_of_words == 1){
        time_1 = Date.now();
    }
    if (number_of_words == 20){
        time_2 = Date.now();
        time_3 = time_2 - time_1;
        wpm = 20/((time_3/1000)/60);
        return wpm.toFixed(2);
    }
}



function Characters(length) {
    result = ''; 
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}