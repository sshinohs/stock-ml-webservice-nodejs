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

let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Price',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
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

let hham = JSON.parse(JSON.stringify(data))

// const ctx = document.getElementById('myChart');
// const myChart = new Chart(ctx, {type: type, data: data, options: options});


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
            res.locals.isLogined = authIsOwner(req, res);
            res.locals.stock_name = stock_name;
            res.locals.stock_price = stock_price;
            res.locals.data = data;
            res.locals.type = type;
            res.locals.options = options;
            res.locals.hham = hham;
            res.render('index', { title: 'Stock ML'});
        })
});

module.exports = router;
