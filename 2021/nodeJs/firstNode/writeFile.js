const fs = require('fs').promises;

fs.writeFile('./writeMe.txt', '글이 입력됩니다.')
    .then(() => {
        return fs.readFile('./writeMe.txt')
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    })