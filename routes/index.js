var express = require('express');
var router = express.Router();
const db = require('../lib/db.js');
const stock_price_update_db = require('../lib/update_db.js')

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

stock_price_update_db();

let type = 'bar';
let options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
router.get('/', function(req, res, next) {

    res.locals.isLogined = authIsOwner(req, res);

    res.locals.type = type;
    res.locals.options = options;

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
});

module.exports = router;
