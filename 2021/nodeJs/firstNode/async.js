const fs = require('fs');

fs.readFile('./readMe.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('1번' , data.toString());
})

fs.readFile('./readMe.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('2번' , data.toString());
})

fs.readFile('./readMe.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('3번' , data.toString());
})

fs.readFile('./readMe.txt', (err, data) => {
    if(err){
        throw err;
    }
    console.log('4번' , data.toString());
})