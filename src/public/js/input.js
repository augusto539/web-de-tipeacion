let input_value
let last_inputed_value
let send_input_value = "";

function input(){
    
    input_value = document.getElementById("main_input").value; // input_value is what the user tipes

    console.log(input_value);
    last_inputed_value = input_value.charAt(input_value.length-1); // last caracter in the word
    
    if (input_value.length > 1) {
        if (last_inputed_value == ' ') {
            send_input_value = '';
        } else {
            send_input_value = Characters(input_value.length - 1) + last_inputed_value;  
        }     
    } else {
        send_input_value = input_value;
    }

    console.log(send_input_value);
    document.getElementById("main_input").value = send_input_value;

    
}

function Characters(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
