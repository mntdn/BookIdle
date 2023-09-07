import {words} from './words'
import {levDist} from './levenshtein'

var log = document.getElementById("log");

console.log(log);
if (log) {
    log.innerHTML = words[1] + levDist("booksdfze", "brzerzeack").toString();
}

let start = performance.now();

for(let i = 0; i < words.length - 1; i++){
    levDist(words[i], words[i+1]);
}

var diff = performance.now() - start;

console.log(diff);