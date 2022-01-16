const axios = require('axios');
const cheerio = require('cheerio');

let words = []
let word = ''
let divided_word = []
let column = 2


function get_numbers(){
    let numbers = [];
    for (let i = 0; i < 20; i++) {
        random_number = Math.floor(Math.random() * (1001 - 0)) + 0;
        numbers.push(random_number);  
    }
    return numbers
}

async function get_words(language){
    words = [];
    if (language == 'english'){
        column = 2
    } else {
        column = 1
    }
    try {
        const url = `https://1000mostcommonwords.com/1000-most-common-${language}-words/`
        const { data } = await axios({method: 'GET', url: url, });

        const $ = cheerio.load(data);
        const elemSelector = 'div > div > table > tbody > tr'
        
        $(elemSelector).each((parentIdx,parentElm) => {
            $(parentElm).children().each((childrenIdx,childrenElm) => {
                if (childrenIdx == column){  
                    words.push($(childrenElm).text());              
                }
            })              
        });
        return words
    } catch (error) {
        console.log(error)
    };
};

module.exports.get_words = get_words;
module.exports.get_numbers = get_numbers;

