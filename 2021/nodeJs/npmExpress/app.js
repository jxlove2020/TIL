// 요청 주소의 순서가 중요함. 순서대로 실행하기 때문에 순서가 중요함
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app = express();

//app.set('port', process.env.PORT || 3000);

// 클라이언트에서 요청했을 때 어떤 응답을 했는지 서버에 기록
app.use(morgan('dev')); // dev (개발시), combined (배포시)

// 요청 경로와 실제경로가 달라서 보안에 도움이 됩니다.
// app.use('요청경로', express.static('실제경로'));
app.use('/', express.static(__dirname, 'public16')); // public 은 알려져 있어서 다른 이름 사용

app.use(cookieParser(process.env.COOKIE_SECRET)); // signedCookies

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 서명되어 읽을 수 없는 글자로 표시
    cookie: {
        httpOnly: true, // javascript 공격 방지
        secure: false,
    },
    name: 'sessionCookie' // 기본적으로 connect.sid 로 되어 있음
}))

// express-session :  body-parser 대신 사용
app.use(express.json()); // 클라이언트에서 json 데이터 보낼 때 데어터 파싱해 줌
// 폼 서브밋 할 때 : 폼 파싱 
app.use(express.urlencoded({ extended: true })); // extended true 면 qs 모드 사용 false 면 querystring 사용

// next 인자로 다음 router 실행
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요'); //터미널에 찍히는 콘솔로그
    next();
});

app.get('/', (req, res) => {

    // // express-session // 개인의 저장 공간
    // req.session.id = 'hello'

    // // 쿠키가 있으면 알아서 넣어줌 
    // req.cookies; // {mycookie: test}
    // // 서명된 쿠키
    // req.signedCookies;

    // // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    // res.cookie('name', encodeURIComponent(name), {
    //     expires: new Date(),
    //     httpOnly: true,
    //     path: '/'
    // });
    // // 쿠키 지울 때 ( 옵션이 같아 야 함 )
    // res.clearCookie('name', encodeURIComponent(name), {
    //     httpOnly: true,
    //     path: '/'
    // });

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