


class TP{
    constructor(data){
        this.data = data;
        this.words_list = [];
        this.word_count = 0;
        this.word_number = 0;
        this.span = '';

        this.input_word_length = 0;
        this.input_word_length_2 = 0;

        this.Correct_words = 0;
        this.errors = 0;
        this.Wrong_words = 0;
        this.Keystrokes = 0;
        this.wpm = 0;
        this.total_time = 0;
    };


    Write_Words(){
        this.words_list = [];

        for (let i = 0; i < 20; i++) {

            this.word_number = Math.round(Math.random() * ((data.length - 1 ) - 0 ) + 0 );
    
            this.words_list.push(data[this.word_number].word);

            this.span = "";

            document.getElementById("word_"+i).style.color = "white";

            for (let a = 0; a < data[ this.word_number].word.length; a++) {
                this.span += `<sapn id="${i}.${a}">${data[ this.word_number].word[a]}</sapn>`   
            };
            document.getElementById("word_"+i).innerHTML = this.span;

        };
        console.log(this.words_list);
    };


    Input(){
        let input_value = document.getElementById("main_input").value;

        this.Keystrokes += 1;

        if (input_value.length < this.input_word_length){

            this.input_word_length -= 1;
            this.input_word_length_2 -= 1;

            document.getElementById(this.word_count + '.' + this.input_word_length).style.color = "white";

        }else if (input_value.charAt(input_value.length-1) == " "){

            this.errors_word(input_value)

            this.word_count += 1;
            this.input_word_length = 0;
            this.input_word_length_2 +=1;

            document.getElementById("main_input").value = "";

            if (this.word_count == 20){

                this.Time('End')

                this.save_data();
            };
        }else{
            this.errors_letter(input_value)
            
            this.input_word_length += 1;
            this.input_word_length_2 +=1;

            this.Time('Start');
        };
    };


    errors_word(input_value){

        if ((input_value) == (this.words_list[this.word_count]+' ')){
            this.Correct_words += 1;
            document.getElementById("Correct_words_number").innerHTML = this.Correct_words;
        }else{
            this.Wrong_words += 1;
            document.getElementById("Wrong_words_number").innerHTML = this.Wrong_words;
            document.getElementById('word_'+this.word_count).style.color = "#c90301";
        };
    };

    errors_letter(input_value){

        document.getElementById("Keystrokes_numbers").innerHTML = this.Keystrokes;
        if (input_value[input_value.length-1] == this.words_list[this.word_count].charAt(input_value.length-1)){
            document.getElementById(this.word_count + '.' + this.input_word_length).style.color = "#4CAF50";
        }else{
            this.errors += 1;
            document.getElementById("errors_number").innerHTML = this.errors;
            document.getElementById(this.word_count + '.' + this.input_word_length).style.color = "#c90301";
        };
    };

    Time(start_end){
        if (start_end == 'Start'){
            if (this.input_word_length_2 == 1){
                this.start = new Date().getTime();
            };
        }else{
            let end = new Date().getTime();
            this.total_time = end - this.start;

            this.wpm = (60000 * 20) / this.total_time;

            document.getElementById("speed_number").innerHTML = this.wpm.toFixed(2);
        };
    };

    save_data(){
        
        let dictionary_to_send={'wpm': this.wpm.toFixed(2),
                                "errors": this.errors,
                                'time': this.total_time,
                                "Correct_words": this.Correct_words,
                                "Wrong_words": this.Wrong_words,
                                'Keystrokes': this.Keystrokes
                                };

        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/home', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(dictionary_to_send));

        window.location.replace(`/home`);
    };
};