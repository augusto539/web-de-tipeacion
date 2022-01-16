// VARIABLES    
let input_value
let speed
let last_inputed_value
let send_input_value = "";
let current_word = '';
let number_of_words = 0;
let Words = [];


function input(language,words_set){
    Words = words_set.split(","); 
    input_value = document.getElementById("main_input").value; // input_value is what the user tipes

    //console.log(input_value);
    last_inputed_value = input_value.charAt(input_value.length-1); // last caracter in the word
    
    if (input_value.length >= 1) {
        if (last_inputed_value == ' ') {
            color(current_word,Words,number_of_words)
            number_of_words += 1
            speed = time(number_of_words)

            //console.log(speed)
            //console.log(number_of_words)

            if (number_of_words == 20){
                location.href=`/home/${language}/${speed}`;
            }
            current_word = '';
            send_input_value = '';
        } else {
            current_word = current_word + last_inputed_value;
            send_input_value = Characters(input_value.length - 1) + last_inputed_value;  
        }     
    } else {
        send_input_value = input_value;
    }

    //console.log(send_input_value);
    document.getElementById("main_input").value = send_input_value; 
}



