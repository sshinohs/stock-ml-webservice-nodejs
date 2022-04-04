const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const getHtml = async () => {
    try {
        return await axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer',responseEncoding: 'binary'});
    } catch (error) {
        console.error(error);
    }
};

ham = axios.get('https://finance.naver.com/sise/',{responseType: 'arraybuffer',responseEncoding: 'binary'})
    .then(resp => {
        const temp = iconv.decode(resp.data, "EUC-KR").toString();
        king = temp;
        // console.log(temp);
    })

console.log(king);


getHtml()
    .then((html) => {
        const temp = iconv.decode(html.data, "EUC-KR").toString();
        const $ = cheerio.load(temp);
        const data = {
            mainContents_01 : $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(2) > a').text(),
            mainContents_02 : $('#siselist_tab_7 > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
        };
        return data;
    })
    .then((res) => console.log(res));


module.exports = getHtml;