
let palabras = ['de','la','que','el','en','los','se','del','un','por','con','no','ver','claro','veces','aquella','misma','programa','nueva','palabras','cual','internacional','fueron','van','una','mujer','esas','igual','tener','persona','dinero',
                'embargo','iba','partido','personas','orden','grupo','cuenta','buena','pueden','quiere','tienen','frente','puesto','empresa','su','tras','para','cosas','es','fin','propia','al','ciudad','lo','libro','como','social','tema','guerra',
                'manera','pero','sistema','sus','ellas','le','historia','total','ha','muchos','creo','me','Juan','tengo','Español','si','sin','cuatro','sobre','dentro','este','nuestro','condiciones','ya','punto','entre','dice','fuerza','cuando',
                'hombre','solo','todo','cualquier','esta','noche','ser','amor','son','agua','dos','perece','puerta','haber','pesar','fue','zona','fuera','sabe','era','bajo','calle','muy','grandes','interior','años','nuestra','tampoco','hasta',
                'ejemplo','desde','acuerdo','vista','mi','usted','campo','porque','estados','buen','hizo','hubiera','nadie','saber','han','obras','yo','horas','hay','posible','ex','vez','tarde','niños','puede','ley','presencia','todos','importante',];
let Keystrokes = 0;
let Correct_words = 0;
let Wrong_words = 0;
let numero_errores_palabla = 0;

let palabras_2 = "";
let palabras_3 = "";
let cantidad_de_palabras = 0;
let cantidad_de_palabras_2 = 0;
let index;

let string_palabras = "";
let x_dividida = "";

let time_1;
let time_2;
let time_3;

function escrivir_palabras(){

    string_palabras = "";

    document.getElementById("errors_number").innerHTML = numero_errores_palabla;

    for (let i = 0; i < 20; i++) {

        let Numero_1 = Math.round(Math.random() * ((palabras.length - 1) - 0) + 0);


        string_palabras += (palabras[Numero_1] + ' ');

        document.getElementById(`${i}`).style.color = "#A7A7A7";
    }

    palabras_2 = string_palabras.split(' ');

    for (let I = 0; I < 20; I++) {
        document.getElementById(`${I}`).innerHTML = palabras_2[I];
    }

}

function input(){
    
    let x = document.getElementById("myInput").value;

    Keystrokes += 1;
    
    if (x.charAt(x.length-1) == " "){

        errores(x);

        cantidad_de_palabras += 1;
        cantidad_de_palabras_2 += 1;

        if (cantidad_de_palabras == 20){
            escrivir_palabras()
            cantidad_de_palabras = 0;
        }
        if (cantidad_de_palabras_2 == 21){

            Keystrokes = 0;
            Correct_words = 0;
            Wrong_words = 0;
            numero_errores_palabla = 0;
            cantidad_de_palabras_2 = 1;

            document.getElementById("speed_number").innerHTML = "0 wpm";
        }
        x = " ";
        document.getElementById("myInput").value = ".";
    }

    tiempo();
    
    document.getElementById("Correct_words_number").innerHTML = Correct_words;
    document.getElementById("Wrong_words_number").innerHTML = Wrong_words;
    document.getElementById("Keystrokes_numbers").innerHTML = Keystrokes;
    }

function errores(x){

    let errores_palabla = numero_errores_palabla;


    for (let o = 1; o < (x.length)-1; o++) {

        if  (palabras_2[cantidad_de_palabras].charAt(o-1) != x.charAt(o)){
            numero_errores_palabla += 1;
        }
    }

    document.getElementById("errors_number").innerHTML = numero_errores_palabla;

    if (errores_palabla != numero_errores_palabla){
        Wrong_words += 1;
        document.getElementById(`${cantidad_de_palabras}`).style.color = "#c90301";
    }
    else{
        Correct_words += 1;
        document.getElementById(`${cantidad_de_palabras}`).style.color = "#4CAF50";
    }

}

function tiempo(){

    if (cantidad_de_palabras_2 == 1){

        let today_1 = new Date();

        time_1 = parseInt(`${today_1.getHours()}${today_1.getMinutes()}${today_1.getSeconds()}`);

    }
    if (cantidad_de_palabras_2 == 20){

        let today_2 = new Date();

        time_2 = parseInt(`${today_2.getHours()}${today_2.getMinutes()}${today_2.getSeconds()}`);

        time_3 = time_2 - time_1;

        let wpm = (20/time_3)*60

        document.getElementById("speed_number").innerHTML = wpm.toFixed(2) + " wpm";
    }
}