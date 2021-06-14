const express = require('express')
const app = express()

// 서버 실행
app.listen(3001, function() {
  console.log("start!!! server is running")
});

// static 파일 (ex: js, css, image)
app.use(express.static('public')) // public 폴더안의 파일을 static 파일로 만듦.

// route
app.get('/', function(req, res) {
  res.send("<h1>hello</h1>")
})
// public 폴더안의 main.html 파일 불러오기
app.get('/main', function(req, res) {
  res.sendFile(__dirname + "/public/main.html")
})