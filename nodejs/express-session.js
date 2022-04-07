var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get('/', function (req, res, next) {
    console.log(req.session)
    if(req.session.ham === undefined) {
        req.session.ham = 1;
    } else {
        req.session.ham = req.session.ham + 1;
    }
    // res.send('Hello session')
    res.send(`Views : ${req.session.ham}`)
})

app.listen(3000, function() {
    console.log('Example app listen on port 3000!')
})