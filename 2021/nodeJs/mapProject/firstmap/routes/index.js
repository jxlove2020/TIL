var express = require('express');
var router = express.Router();
const locationModel = require('../model/location')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Express' });
});

// 비구조화 할당 post 방식의 API - 데이터베이스 저장
router.post('/location', (req, res, next) => {
  const { title, address, lat, lng } = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location.save().then((result) => {
    console.log(result);
    res.json({
      message: "success"
    });
  })
  .catch((error) => {
    console.log(error);
    res.json({
      message: "error",
    });
  });
});

// 테스트 API - 포스트 맨에서 확인 ===================================
router.get('/test', (req, res, next) => {
  console.log("get 테스트 완료")
  res.json({
    message: "response 완료!",
  });
});

// post 테스트 
router.post('/test2', (req, res, next) => {
  console.log("post 테스트 완료")
  res.json({
    message: "post 완료!",
  });
});

// post 테스트 - Body 안에 데이터가 담길경우
router.post('/test3', (req, res, next) => {
  console.log("post Body 테스트 완료")
  const test1 = req.body.test1;
  const test2 = req.body.test2;
  console.log(test1);
  console.log(test2);
  res.json({
    message: "post Body 완료!",
  });
});

// post 테스트 - Body 안에 데이터가 담길경우 - 비구조화 할당
router.post('/test4', (req, res, next) => {
  console.log("post Body 테스트 완료")
  const {test1, test2} = req.body;
  console.log(test1);
  console.log(test2);

  res.json({
    message: "post Body 비구조화 할당 완료!",
  });
});

module.exports = router;
