const express = require('express');
const morgan = require('morgan');  // 서버의 콘솔로그를 출력
const app = express();

let users = [
	{id: 1, name: 'mark'},
	{id: 2, name: 'jake'},
	{id: 3, name: 'tom'},
];

app.use(morgan('dev'));

// 라우팅
app.get('/', function(req, res) {
	res.send('Hello World');
})
app.get('/users', function(req, res) {
	res.json(users);
})

app.listen(3001, function() {
	console.log('Server is running')
})