function encrypt(password, text) {
 
    // move text to base64 so we avoid special chars
    const base64 = btoa( text );
  
    // text string to array
    const arr = base64.split('');
    // array of password
    const arrPass = password.split('');
    let lastPassLetter = 0;
  
    // encrypted string
    let encrypted = '';
  
    // encrypt
    for (let i=0; i < arr.length; i++) {
   
      const letter = arr[ i ];
   
      const passwordLetter = arrPass[ lastPassLetter ];
   
      const temp = getLetterFromAlphabetForLetter( 
        passwordLetter, letter );
   
      if (temp) {
        // concat to the final response encrypted string
        encrypted += temp;
      } else {
        // if any error, return null
        return null;
      }  
   
      /*
        This is important: if we're out of letters in our 
        password, we need to start from the begining.
      */
      if (lastPassLetter == (arrPass.length - 1) ) {
        lastPassLetter = 0;
      } else {
        lastPassLetter ++;
      }  
  }
  
  // We finally return the encrypted string
  return encrypted;
 }


 function getLetterFromAlphabetForLetter(letter, letterToChange) {
    // this is the alphabet we know, plus numbers and the = sign 
    const abc = 'abcdefghijklmnopqrstuvwxyz0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     
    // get the position of the given letter, according to our abc
    const posLetter = abc.indexOf( letter );
    
    // if we cannot get it, then we can't continue
    if (posLetter == -1) {
     console.log('Password letter ' + letter + ' not allowed.');
     return null;
    }
    // according to our abc, get the position of the letter to encrypt
    const posLetterToChange = abc.indexOf( letterToChange );
    
    // again, if any error, we cannot continue...
    if (posLetterToChange == -1) {
     console.log('Password letter ' + letter + ' not allowed.');
     return null;
    }
    
    // let's build the new abc. this is the important part
    const part1 = abc.substring(posLetter, abc.length);
    const part2 = abc.substring(0, posLetter);
    const newABC = '' + part1 + '' + part2;
    
    // we get the encrypted letter
    const letterAccordingToAbc = newABC.split('')[ posLetterToChange ];
    
    // and return to the routine...
    return letterAccordingToAbc; 
}

function decrypt(password, text) {
 
    // convert the string to decrypt into an array
    const arr = text.split('');
    
    // let's also create an array from our password
    const arrPass = password.split('');
    
    // keep control about which letter from the password we use
    let lastPassLetter = 0;
    
    // this is the final decrypted string
    let decrypted = '';
    
    // let's start...
    for (let i=0; i < arr.length; i++) {
     
     // next letter from the string to decrypt
     const letter = arr[ i ];
     
     // get the next letter from the password
     const passwordLetter = arrPass[ lastPassLetter ];
     // get the decrypted letter according to the password
     const temp = getInvertedLetterFromAlphabetForLetter(
         passwordLetter, letter );
     if (temp) {
      // concat the response
      decrypted += temp;
     } else {
      // if any error, return null
      return null;
     }  
     
     // if our password is too short, 
     // let's start again from the first letter
     if (lastPassLetter == (arrPass.length - 1) ) {
      lastPassLetter = 0;
     } else {
      lastPassLetter ++;
     }  
    }
    // return the decrypted string and converted 
    // from base64 to plain text
    return atob( decrypted );
}

function getInvertedLetterFromAlphabetForLetter(
    letter, letterToChange) {
     
   const abc = 'abcdefghijklmnopqrstuvwxyz0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const posLetter = abc.indexOf( letter );
   
   if (posLetter == -1) {
    console.log('Password letter ' + letter + ' not allowed.');
    return null;
   }
   const part1 = abc.substring(posLetter, abc.length);
   const part2 = abc.substring(0, posLetter);
   
   const newABC = '' + part1 + '' + part2; 
   
   const posLetterToChange = newABC.indexOf( letterToChange );
   
   if (posLetterToChange == -1) {
    console.log('Password letter ' + letter + ' not allowed.');
    return null;
   }
   
   const letterAccordingToAbc = abc.split('')[ posLetterToChange ];
   
   return letterAccordingToAbc; 
}


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;