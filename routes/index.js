var express = require('express');
var router = express.Router();
const db = require('../lib/db.js');

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

let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Price',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
}

let type = 'bar';
let options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
router.get('/', function(req, res, next) {
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
            let stock_price2 = []
            for(let i=0; i<stock_price.length; i++) {
                stock_price2.push(stock_price[i].replace(/,/,''));
            }

            res.locals.isLogined = authIsOwner(req, res);

            res.locals.stock_name = stock_name;
            res.locals.stock_price = stock_price;

            res.locals.data = data;

            res.locals.type = type;
            res.locals.options = options;

            res.locals.stock_price2 = stock_price2;

            db.query(`SELECT * FROM stock_price`, function(err, prices) {
                res.locals.prices = prices;
                let stock_price_db = []
                let stock_name_db = []
                for(let i=0; i<prices.length; i++) {
                    stock_price_db.push(prices[i].price)
                    stock_name_db.push(prices[i].name)
                }
                let data_stock = {
                    labels: stock_name_db,
                    datasets: [{
                        label: 'Price',
                        data: stock_price_db,
                        borderWidth: 1
                    }]
                }
                res.locals.data_stock = data_stock;
                res.render('index', { title: 'Stock ML'});
            })
        })
});

module.exports = router;
