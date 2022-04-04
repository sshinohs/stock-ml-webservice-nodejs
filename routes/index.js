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
      stock_name_1 = $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(2) > a').text();
      stock_price_1 = $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(3)').text();
        stock_name_2 = $('#siselist_tab_7 > tbody > tr:nth-child(4) > td:nth-child(2) > a').text();
        stock_price_2 = $('#siselist_tab_7 > tbody > tr:nth-child(4) > td:nth-child(3)').text();
        stock_name_3 = $('#siselist_tab_7 > tbody > tr:nth-child(5) > td:nth-child(2) > a').text();
        stock_price_3 = $('#siselist_tab_7 > tbody > tr:nth-child(5) > td:nth-child(3)').text();
        stock_name_4 = $('#siselist_tab_7 > tbody > tr:nth-child(6) > td:nth-child(2) > a').text();
        stock_price_4 = $('#siselist_tab_7 > tbody > tr:nth-child(6) > td:nth-child(3)').text();
        stock_name_5 = $('#siselist_tab_7 > tbody > tr:nth-child(7) > td:nth-child(2) > a').text();
        stock_price_5 = $('#siselist_tab_7 > tbody > tr:nth-child(7) > td:nth-child(3)').text();
        stock_name_6 = $('#siselist_tab_7 > tbody > tr:nth-child(11) > td:nth-child(2) > a').text();
        stock_price_6 = $('#siselist_tab_7 > tbody > tr:nth-child(11) > td:nth-child(3)').text();
        stock_name_7 = $('#siselist_tab_7 > tbody > tr:nth-child(12) > td:nth-child(2) > a').text();
        stock_price_7 = $('#siselist_tab_7 > tbody > tr:nth-child(12) > td:nth-child(3)').text();
        stock_name_8 = $('#siselist_tab_7 > tbody > tr:nth-child(13) > td:nth-child(2) > a').text();
        stock_price_8 = $('#siselist_tab_7 > tbody > tr:nth-child(13) > td:nth-child(3)').text();
        stock_name_9 = $('#siselist_tab_7 > tbody > tr:nth-child(14) > td:nth-child(2) > a').text();
        stock_price_9 = $('#siselist_tab_7 > tbody > tr:nth-child(14) > td:nth-child(3)').text();
        stock_name_10 = $('#siselist_tab_7 > tbody > tr:nth-child(15) > td:nth-child(2) > a').text();
        stock_price_10 = $('#siselist_tab_7 > tbody > tr:nth-child(15) > td:nth-child(3)').text();

      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Stock ML' });
      });
    })


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
