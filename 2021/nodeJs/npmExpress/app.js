const express = require('express');
const path = require('path');

const app = express();

// next 인자로 다음 router 실행
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요'); //터미널에 찍히는 콘솔로그
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/express', (req, res) => {
    res.send('hello express');
});

// 에러가 발생시
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러가 발생했습니다.');
})

app.listen(3000, () => {
    console.log('익스프레스 서버 실행');
});