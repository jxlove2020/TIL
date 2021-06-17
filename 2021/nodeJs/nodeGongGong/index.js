const request = require('request')
const cheerio = require('cheerio')
const config = require('./config/cfg.json')

const svckey = config.svcKey
const yearMonth = "202012"
const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${svckey}&pageNo=1&numOfRows=10&LAWD_CD=11110&DEAL_YMD=${yearMonth}&_type=json`

request(url, function(err, res, body){
  const jsonText = JSON.parse(cheerio.load(body).text())
  console.log(jsonText.response.body.items);
})
