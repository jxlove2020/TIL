// 경로 처리
const path = require('path');

//join 은 절대경로 무시 // resolve는 절대경로로 간다
console.log(path.join(__dirname, '/var.js'));
console.log(path.join(__dirname, '..', '/var.js')); // 부모경로로 
console.log(path.resolve(__dirname, '/var.js'));    // 절대 경로
console.log(path.resolve(__dirname, '..', '/var.js')); // 절대 경로로 이동


// POSIX : mac 과 Linux 를 합쳐서 부를때 쓰는 용어
