var express = require("express");
var router = express.Router();
const locationModel = require("../model/location");
const { svckey, vworld } = require("../config/userConfig.json");
var request = require("request");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "지도" });
});

router.get("/upload", (req, res, next) => {
  res.render("upload", { title: "업로드" });
});

router.get("/region", (req, res, next) => {
  res.render("region", { title: "지역" });
});

// 비구조화 할당 post 방식의 API - 데이터베이스 저장
router.post("/location", (req, res, next) => {
  const { title, address, lat, lng } = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location
    .save()
    .then(result => {
      console.log(result);
      res.json({
        message: "success",
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        message: "error",
      });
    });
});

router.get("/location", (req, res, next) => {
  locationModel
    .find({}, { _id: 0, __v: 0 })
    .then(result => {
      console.log(result);
      res.json({
        message: "success",
        data: result,
      });
    })
    .catch(error => {
      res.json({
        message: "error",
      });
    });
});
// main
router.get("/mainApi", (req, res, next) => {
  // 응답 형식 을 xml 에서 json 형태로 바꾸고 싶을 때 API 끝에 &_type=json 붙이면 json 형태로 응답을 받을 수 있다.
  const searchText = encodeURIComponent("서울");
  const url = `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIDO_INFO&key=${vworld}&attrFilter=ctp_kor_nm:like:${searchText}&domain=localhost:3000`;

  var dataApi = {};

  request.get(url, (err, response, body) => {
    if (err) {
      console.log(`err => ${err}`);
      dataApi = err;
    } else {
      if (response.statusCode === 200) {
        var result = JSON.parse(body);
        var data = result;
        // console.log(data);
        res.json({
          data,
        });
      }
    }
  });
});

// region
router.get("/regionApi", (req, res, next) => {
  // 응답 형식 을 xml 에서 json 형태로 바꾸고 싶을 때 API 끝에 &_type=json 붙이면 json 형태로 응답을 받을 수 있다.
  const searchText = encodeURIComponent("삼성동");
  const url = `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=${vworld}&attrFilter=emd_kor_nm:like:${searchText}&domain=localhost:3000`;

  var dataApi = {};

  request.get(url, (err, response, body) => {
    if (err) {
      console.log(`err => ${err}`);
      dataApi = err;
    } else {
      if (response.statusCode === 200) {
        var result = JSON.parse(body);
        var data = result;
        // console.log(data);
        res.json({
          data,
        });
      }
    }
  });
});
router.get("/testApi", (req, res, next) => {
  // 응답 형식 을 xml 에서 json 형태로 바꾸고 싶을 때 API 끝에 &_type=json 붙이면 json 형태로 응답을 받을 수 있다.
  const site =
    "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
  const pageNo = 1;
  const numOfRows = 1000;
  const LAWD_CD = 11680;
  const DEAL_YMD = 202012;
  const url = `${site}?serviceKey=${svckey}&pageNo=${pageNo}&numOfRows=${numOfRows}&LAWD_CD=${LAWD_CD}&DEAL_YMD=${DEAL_YMD}&_type=json`;

  var dataApi = {};

  request.get(url, (err, response, body) => {
    if (err) {
      console.log(`err => ${err}`);
      dataApi = err;
    } else {
      if (response.statusCode === 200) {
        var result = JSON.parse(body);
        var data = result.response.body.items.item;
        console.log(data);
        res.json({
          data,
        });
      }
    }
  });
});

// 테스트 API - 포스트 맨에서 확인 ===================================
router.get("/test", (req, res, next) => {
  console.log("get 테스트 완료");
  res.json({
    message: "response 완료!",
  });
});

// post 테스트
router.post("/test2", (req, res, next) => {
  console.log("post 테스트 완료");
  res.json({
    message: "post 완료!",
  });
});

// post 테스트 - Body 안에 데이터가 담길경우
router.post("/test3", (req, res, next) => {
  console.log("post Body 테스트 완료");
  const test1 = req.body.test1;
  const test2 = req.body.test2;
  console.log(test1);
  console.log(test2);
  res.json({
    message: "post Body 완료!",
  });
});

// post 테스트 - Body 안에 데이터가 담길경우 - 비구조화 할당
router.post("/test4", (req, res, next) => {
  console.log("post Body 테스트 완료");
  const { test1, test2 } = req.body;
  console.log(test1);
  console.log(test2);

  res.json({
    message: "post Body 비구조화 할당 완료!",
  });
});

module.exports = router;
