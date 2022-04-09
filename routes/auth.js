var express = require('express');
var router = express.Router();

var authData = {
    email:'egoing777@gmail.com',
    pwd:'111111',
    nickname:'egoing'
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req,res) {
    res.render('login')
    // res.send('ham!')
})

router.post('/login_process', function(req,res){
    var post = req.body;
    var email = post.email;
    var password = post.pwd;
    if(email === authData.email  && password === authData.pwd) {
        console.log(post);
        req.session.is_logined = true;
        req.session.nickname = authData.nickname;
        req.session.save(function(err) {
            res.redirect(`/`);
        })
    } else {
        console.log(post);
        res.send('Who?')
    }
})

router.get('/logout', function(req,res) {
    req.session.destroy(function(err) {
        res.redirect('/')
    })
})


module.exports = router;