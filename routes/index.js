var express = require('express');
var router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function authIsOwner(req, res) {
    if(req.session.is_logined){
        return `logout`;
    } else {
        return `login`;
    }
}

router.get('/', function(req, res, next) {
    console.log(req.session);
    const arrNumber = [3, 4, 5, 6, 7, 11, 12, 13, 14, 15]
    let stock_name = []
    let stock_price = []
    axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer',responseEncoding: 'binary'})
        .then(resp => {
            const temp = iconv.decode(resp.data, "EUC-KR").toString();
            king = temp;
            $ = cheerio.load(king);
            for (let i=0; i<arrNumber.length; i++) {
                stock_name.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(2) > a`).text())
                stock_price.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(3)`).text())
            }
            ham = authIsOwner(req, res);
            res.render('index', { title: 'Stock ML', ham, stock_name, stock_price });
        })
});

module.exports = router;
