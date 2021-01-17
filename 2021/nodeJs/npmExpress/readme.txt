
npm i -D nodemon 설치시 설치가 되지 않으면
i 대신 install 로 설치
-D 옵션은 제일 뒤에 붙여줘도 된다.

// morgan 클라이언트에서 어떤요청이 왔는지 콘솔에 찍어준다.
// cookie-parser 쿠키 관련
// express-session 세션 관련 ( 이전에는 body-parser 사용 )
npm i morgan cookie-parser express-session

// dotenv : 소스코드의 키를 관리, 환경변수에 비밀키를 넣어두는것 
// .env 파일을 생성하여 그곳에서 관리 
// 깃 에서는 ignore 하여 올리지 말것 // 관리 철저하게 해야 함
npm i dotenv

// 템플릿엔진은 둘 중 하나 선택 사용 pug , nunjucks
// pug 템플릿엔진을 사용하려면 아래 내용 추가
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// nunjucks 템플릿엔진을 사용하려면 아래 내용 추가
const nunjucks = require('nunjucks');
app.set('view engine', 'html'); // html, njk 중 하나 사용
nunjucks.configure('views', {
    express: app,
    watch: true,
});
