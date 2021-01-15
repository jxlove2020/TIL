const fs = require('fs').promises;  // 프로미스 지원

fs.readFile('./readMe.txt')
    .then((data) => {
        console.log(data); // 버퍼의 내용을 읽습니다.
        console.log(data.toString()); // 글자를 읽습니다.
    })
    .catch((err) => {
        throw err;
    });

// =====================================================

// const fs = require('fs');

// fs.readFile('./readMe.txt', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data); // 버퍼의 내용을 읽습니다.
//     console.log(data.toString()); // 글자를 읽습니다.
// })