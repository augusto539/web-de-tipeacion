
let palabras = ['hola', 'como', 'estas', 'yo','bien','y', 'vos','bien','tanbien','gracias','por','preguntar'];

let Keystrokes = 0;
let Correct_words = 0;
let Wrong_words = 0;

let palabras_2 = "";
let palabras_3 = "";
let cantidad_de_palabras = 0;
let index;

let string_palabras = "";
let x_dividida = "";

let numero_errores_palabla = 0;

function escrivir_palabras(){

    string_palabras = "";

    for (let i = 0; i < 20; i++) {

        let Numero_1 = Math.round(Math.random() * (palabras.length - 0) + 0);


        string_palabras += (palabras[Numero_1] + ' ');
    }

    palabras_2 = string_palabras.split(' ');

    for (let I = 0; I < 10; I++) {
        document.getElementById(`${I}`).innerHTML = palabras_2[I];
        document.getElementById(`${I + 10}`).innerHTML = palabras_2[I + 10];
    }

    console.log(palabras_2)
}

function input(){
    
    let x = document.getElementById("myInput").value;

    Keystrokes += 1;
    
    if (x.includes(' ')){

        errores(x);

        cantidad_de_palabras += 1;

        if (cantidad_de_palabras == 20){
            escrivir_palabras()
        }
        if (cantidad_de_palabras > 20){
            cantidad_de_palabras = 1;
        }

        console.log(cantidad_de_palabras);

        x = " ";
        document.getElementById("myInput").value = "";
    }
    
    document.getElementById("Correct_words_number").innerHTML = Correct_words;
    document.getElementById("Wrong_words_number").innerHTML = Wrong_words;
    document.getElementById("Keystrokes_numbers").innerHTML = Keystrokes;
    }

function errores(x){


    if (string_palabras.includes(x)){
        Correct_words += 1;

        console.log(string_palabras);
    }
    else{
        Wrong_words += 1;
    }

    if (Wrong_words != 0){
        if (Wrong_words == 1){

            palabra_3 = palabras_2[Correct_words];

            comparar_listas(palabra_3,x);
    
        }
        else{
            index = (Wrong_words + Correct_words) - 1; 

            palabra_3 = palabras_2[index];

            comparar_listas(palabra_3,x);
        }
    }
}

function comparar_listas(lista_1,lista_2){
    for (let i = 0; i < lista_1.length; i++) {
        if (lista_1[i-1] != lista_2[i-1]){

            console.log(lista_1);
            console.log(lista_1[i-1]);

            console.log(lista_2);
            console.log(lista_2[i-1]);

            numero_errores_palabla += 1;
        } 
    }
    document.getElementById("errors_number").innerHTML = numero_errores_palabla;
}

