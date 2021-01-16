const http = require('http');

const server = http.createServer((req, res) => {

    // 사파리 같은 경우 html 인지 알려주는 헤더 를 넣어주어야 함
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello David</p>');
}).listen(51234);

server.on('listening', () => {
    console.log('51234번 포트에서 서버 대기 중입니다.');
});
server.on('error', (error) => {
    console.log(error);
});


// const http = require('http');

// http.createServer((req, res) => {
//     res.write('<h1>Hello Node</h1>');
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Hello David</p>');
// }).listen(51234, ()=> {
//     console.log('51234번 포트에서 서버 대기 중입니다.');
// })
