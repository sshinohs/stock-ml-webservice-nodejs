const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'stock_db'
})

connection.connect();
