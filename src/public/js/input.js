// VARIABLES    
// new new input
let number_of_words = 0;
let Words = [];
let word = [];
let number_of_errors = 0;
let speed = '';
let correct_words = 0;
let wrong_words = 0;

function input(language,words_set,event){
    let code = event.which || event.keyCode; // code of the chararcter
    let letter = String.fromCharCode(code); // convert the code in actual chacaters
    letter = letter.toLocaleLowerCase(); // parse the leter to lower case
    word.push(letter); // fil word with the code of the caracter
    Words = words_set.split(","); // split the words set by the ',' 

    if(code == 32){ // space
        word.pop(); // delete the space code from the list
        let word_string = word.toString(); // convert the list of the actual word to a string
        word_string = word_string.replace(/,/g, ''); // delte the ',' form the strign
        
        number_of_words += 1; // increase the number of words by one

        speed = time(number_of_words); // call the time function

        if (word_string == Words[number_of_words-1]) { // compare the two strings
            correct_words += 1; // increase the number of correct words by one
        } else {
            wrong_words += 1; // increase the number of wrong words by one
        };
        
        word = []; // reset the list of the actual word
        document.getElementById("main_input").value = ''; // reset the input value
        
        if (number_of_words == 20) { // send the info and restart
            let encrypted_speed = encrypt('holasoyunacontrasenia',speed);   // encrypt the speed value
            let encrypted_correcr_words = encrypt('holasoyunacontrasenia',correct_words); // encrypt the number of correct words
            let encrypted_wrong_words = encrypt('holasoyunacontrasenia',wrong_words); // encrypt the number of wrong words
            let encrypted_number_of_errors = encrypt('holasoyunacontrasenia',number_of_errors); // encrypt the number of errors
            
            location.href=`/home/${language}/${encrypted_speed}/${encrypted_correcr_words}/${encrypted_wrong_words}/${encrypted_number_of_errors}`;
        }
    };
    if(code == 8){ // backspace
        word.pop();  // delet the backspace code from the list
        let id = `${number_of_words},${word.length}`; // save the id of the letter to be deleted
        word.pop();  // delete the letter
        color(id,'backspace'); // set the color of the letter
    };
    if (code != 32 && code != 8) {
        let id = `${number_of_words},${word.length}`;
        if (Words[number_of_words][word.length-1] == word[word.length-1]) { // compare the last letter tiped with the word
            color(id,'correct'); // set the color of the letter
        } else {
            number_of_errors += 1; // increase the number of errors by one
            color(id,'in_correct'); // set the color of the letter
        };
    };
};