// write_words
let DataBase = ['de','la','que','el','en','los','se','del','un','por','con','no','ver','claro','veces','aquella','misma','programa','nueva','palabras','cual','internacional','fueron','van','una','mujer','esas','igual','tener','persona','dinero',
                'embargo','iba','partido','personas','orden','grupo','cuenta','buena','pueden','quiere','tienen','frente','puesto','empresa','su','tras','para','cosas','es','fin','propia','al','ciudad','lo','libro','como','social','tema','guerra',
                'manera','pero','sistema','sus','ellas','le','historia','total','ha','muchos','creo','me','Juan','tengo','Español','si','sin','cuatro','sobre','dentro','este','nuestro','condiciones','ya','punto','entre','dice','fuerza','cuando',
                'hombre','solo','todo','cualquier','esta','noche','ser','amor','son','agua','dos','perece','puerta','haber','pesar','fue','zona','fuera','sabe','era','bajo','calle','muy','grandes','interior','años','nuestra','tampoco','hasta',
                'ejemplo','desde','acuerdo','vista','mi','usted','campo','porque','estados','buen','hizo','hubiera','nadie','saber','han','obras','yo','horas','hay','posible','ex','vez','tarde','niños','puede','ley','presencia','todos','importante',];

let string_DataBase = "";
let word_number = 0;
let words_set_strig = "";
let words_set_strig_without_spaces = "";
let words_set_list = [];
let word_to_Write = "";
let span = "";

// input
let Keystrokes = 0;
let Correct_words = 0;
let Wrong_words = 0;

let input_value = "";
let number_of_words = 0;
let number_of_words_2 = 0;


// errors
let errors_for_words_1 = 0;
let errors_for_words_2 = 0;


function Write_Words(){

    words_set_strig = "";

    for (let i = 0; i < 20; i++) {

        word_number = Math.round(Math.random() * ((DataBase.length - 1 ) - 0 ) + 0 );

        words_set_strig += (DataBase[word_number] + " ");
        words_set_strig_without_spaces += (DataBase[word_number])

        document.getElementById("word_"+i).style.color = "white";
    }

    words_set_list = words_set_strig.split(' ');

    for (let e = 0; e < 20; e++) {
        word_to_Write = words_set_list[e];
        span = "";

        for (let a = 0; a < word_to_Write.length; a++) {
            span += `<sapn id="${e}.${a}">${word_to_Write[a]}</sapn>` 
        }
        document.getElementById("word_"+e).innerHTML = span;
    }    
}




function input(){
    
    let input_value = document.getElementById("main_input").value;

    console.log(input_value);

    Keystrokes += 1;
    
    if (input_value.charAt(input_value.length-1) == " "){

        errors(input_value);

        number_of_words += 1;
        number_of_words_2 += 1;

        if (number_of_words == 20){
            Write_Words(); 
            number_of_words = 0;
        }
        if (number_of_words_2 == 21){

            Keystrokes = 0;
            Correct_words = 0;
            Wrong_words = 0;
            errors_for_words_2 = 0;
            number_of_words_2 = 1;

            document.getElementById("speed_number").innerHTML = "0 wpm";
        }
        input_value = " ";
        document.getElementById("main_input").value = "";
    }

    time();
    
    document.getElementById("Correct_words_number").innerHTML = Correct_words;
    document.getElementById("Wrong_words_number").innerHTML = Wrong_words;
    document.getElementById("Keystrokes_numbers").innerHTML = Keystrokes;
}




function errors(input_value){

    let errors_for_words_1 = errors_for_words_2;

    for (let o = 1; o < (input_value.length)-1; o++) {

        if  (words_set_list[number_of_words].charAt(o) != input_value.charAt(o)){
            errors_for_words_2 += 1;
        }
    }

    document.getElementById("errors_number").innerHTML = errors_for_words_2;

    if (errors_for_words_1 != errors_for_words_2){
        Wrong_words += 1;
        document.getElementById(`word_${number_of_words}`).style.color = "#c90301";
    }
    else{
        Correct_words += 1;
        document.getElementById(`word_${number_of_words}`).style.color = "#4CAF50";
    }

}

function time(){

    if (number_of_words_2 == 1){

        let today_1 = new Date();

        time_1 = parseInt(`${today_1.getHours()}${today_1.getMinutes()}${today_1.getSeconds()}`);

    }
    if (number_of_words_2 == 20){

        let today_2 = new Date();

        time_2 = parseInt(`${today_2.getHours()}${today_2.getMinutes()}${today_2.getSeconds()}`);

        time_3 = time_2 - time_1;

        let wpm = (20/time_3)*60

        document.getElementById("speed_number").innerHTML = wpm.toFixed(2) + " wpm";
    }
}