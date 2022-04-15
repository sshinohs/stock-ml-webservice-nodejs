const schedule = require('node-schedule');
const axios = require("axios");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");
const db = require('./db.js');

// db.query(`SELECT * FROM stock_price`, function(error, prices) {
//     console.log(prices);
// })


const arrNumber = [3, 4, 5, 6, 7, 11, 12, 13, 14, 15]

const j = schedule.scheduleJob('*/10 * * * * *', async() => {
    console.log('Stock price updated!')
    db.query(`TRUNCATE TABLE stock_price`, function(error, result) {
        if(error) {
            throw error;
        }
    })

    let stock_name = []
    let stock_price = []

    axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer', responseEncoding: 'binary'})
        .then(resp => {
            let king = iconv.decode(resp.data, "EUC-KR").toString();
            let $ = cheerio.load(king);
            for(let i=0; i<arrNumber.length; i++) {
                stock_name.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(2) > a`).text())
                stock_price.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(3)`).text())
            }
            for(let i=0; i<arrNumber.length; i++) {
                db.query(`INSERT INTO stock_price (name, price) VALUES(?, ?)`,[stock_name[i], stock_price[i].replace(/,/,'')], function(error, result) {
                    if(error) {
                        throw error;
                    }
                })
            }
        })
})


// TRUNCATE TABLE stock_price
//
// INSERT INTO topic (name, price) VALUES('삼성전자', 100000)





// const j = schedule.scheduleJob('*/30 * * * *', async() => {
//     console.log('ham');
// })


// const j = schedule.scheduleJob('* * * * * *', async() => {
//     axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer', responseEncoding: 'binary'})
//         .then(resp => {
//             const temp = iconv.decode(resp.data, "EUC-KR").toString();
//             king = temp;
//             $ = cheerio.load(king);
//             for(let i=0; i<arrNumber.length; i++) {
//                 stock_name.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(2) > a`).text())
//                 stock_price.push($(`#siselist_tab_7 > tbody > tr:nth-child(${arrNumber[i]}) > td:nth-child(3)`).text())
//             }
//         })
//     console.log('ham');
// })