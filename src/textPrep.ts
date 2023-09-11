import {words} from './words'

export interface cleanString {
    nonLetters: (string|number)[][],
    cleanedString: string
}

export function getWordsByLength() {
    var result: string[][] = [];
    for (let i = 0; i < 100; i++) {
        result[i] = [];
    }

    words.forEach(w => {
        result[w.length].push(w);
    });
    return result;
}

// Puts all the non letter characters from the string in an array of arrays, each entry contains the character with its position.
// If a letter needs to be uppercase, we store ["U", pos].
// To recompose the final string, just loop through the array and insert the elements at the position
export function detectNonLetter(s: string): cleanString {
    let result = [];
    let finalString = "";
    const rLetterSpace: RegExp = RegExp(/[a-z ]/, "i");
    const rCapsLetter: RegExp = RegExp(/[A-Z]/);
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if(!rLetterSpace.test(c)){
            result.push([c, i]);
            if(i < s.length - 1 && s[i+1] === " ") {
                // we add a space only if there was one. No space after, it's probably an apostrophe
                finalString += " ";
            }
        } else {
            finalString += c.toLowerCase();
        }
        if(rCapsLetter.test(c))
            result.push(["U", i]);
    }
    
    return {
        nonLetters: result,
        cleanedString: finalString.replace(/  /g, " ")
    };
}

// Apply the modifications contained in the cleanString object to recompose a "normal" string
export function textRecompose(s: string, cs: (string|number)[][]): string {
    let result: string[] = [];
    let cleanPosition = 0;
    let positionInTmpString = 0;
    for (let i = 0; i < s.length; i++) {
        let element = s[i];
        if(cs[cleanPosition][1] === positionInTmpString){
            let toInsert = cs[cleanPosition][0].toString();
            if(toInsert === "U")
                element = element.toUpperCase();
            else {
                result.push(cs[cleanPosition][0].toString())
                positionInTmpString++;
            }
            cleanPosition++;
        }
        result.push(element);
        positionInTmpString++;
    }
    return result.join("");
}