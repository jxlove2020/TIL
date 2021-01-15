// 구조분해 
const { odd, even } = require('./var');

function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;