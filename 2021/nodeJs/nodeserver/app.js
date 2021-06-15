const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 서버 실행
app.listen(3001, function() {
  console.log("start!!! server is running")
});

app.use(express.static('public')) // public 폴더안의 파일을 static 파일로 만듦. // static 파일 (ex: js, css, image)
app.use(bodyParser.json()) // json 형태로 주고 받을 때
app.use(bodyParser.urlencoded({extended: true})) // url 인코딩 된 데이터 주고 받을 때

// view engine ejs 사용
app.set('view engine', 'ejs')

// route
app.get('/', function(req, res) {
  res.send("<h1>hello</h1>")
})

// public 폴더안의 main.html 파일 불러오기
app.get('/main', function(req, res) {
  res.sendFile(__dirname + "/public/main.html")
})
// public 폴더안의 user.html 파일 불러오기
app.get('/user', function(req, res) {
  res.sendFile(__dirname + "/public/user.html")
})

// type: post형식 
app.post('/user_post', function(req, res) {
  // get: req.param('email')
  // console.log(req.body) // object 형태
  console.log(req.body.user) 
  // res.send(`<h1>welcome ${req.body.user} </h1>`)

  // ejs view
  res.render('user.ejs', { 'user': req.body.user })
})

app.post('/ajax_send_user', function(req, res){
  console.log(req.body.user);
  var responseData = {'result': 'ok', 'user': req.body.user}
  res.json(responseData);
})