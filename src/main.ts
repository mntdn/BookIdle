import {getWordsByLength, detectNonLetter, textRecompose} from './textPrep'
import {levDist} from './levenshtein'

var log = document.getElementById("log");

var wbl = getWordsByLength();

var strToChange = "Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you’d expect to be involved in anything strange or mysterious, because they just didn’t hold with such nonsense.";

var cleanString = detectNonLetter(strToChange);

let start = performance.now();

var result: string[] = [];
cleanString.cleanedString.split(" ").forEach(s => {
    var minLev = s.length;
    var finalWord = "";
    wbl[s.length].forEach(l => {
        if(l !== s){
            const ld = levDist(l, s);
            if(ld < minLev){
                minLev = ld;
                finalWord = l;
            }
        }
    });
    result.push(finalWord);
});

var diff = performance.now() - start;

console.log(diff);

let finalString = result.join(" ");

if (log) {
    log.innerHTML = strToChange + "<br />";
    log.innerHTML += cleanString.cleanedString + "<br />";
    log.innerHTML += textRecompose(finalString, cleanString.nonLetters);
}
