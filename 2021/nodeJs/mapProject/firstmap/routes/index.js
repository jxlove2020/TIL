var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Express' });
});

module.exports = router;
