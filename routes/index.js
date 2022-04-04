var express = require('express');
var router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');


ham = axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer',responseEncoding: 'binary'})
    .then(resp => {
      const temp = iconv.decode(resp.data, "EUC-KR").toString();
      king = temp;
      // console.log(king);
      $ = cheerio.load(king);
      stock_name = $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(2) > a').text();
      stock_price = $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(3)').text();
      console.log(stock_name);
      console.log(stock_price);
      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      });
    })


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
