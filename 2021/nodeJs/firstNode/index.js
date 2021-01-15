const { odd, even } = require('./var');

// checkNumber : 변수명은 바꿔줄 수 있다. 
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if(str.length % 2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkStringOddOrEven('Hello Node'));
console.log(checkNumber(5));

console.log(__filename);
console.log(__dirname);