var express = require('express');

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");

var app = express();

//导入 passport
var passport = require('passport');
//导入 passprot 策略
var passportLocal = require('passport-local');

//注意顺序定义在 passport 之前
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || "zidea",
    resave: false,
    saveUninitialized: false
}));

//初始化 passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done){

    if(username === password){
        done(null,{ id:username, name:username });
    }else{
        done(null, null);
    }
}))

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{
        isAuthenticated:req.isAuthenticated(),
        user:req.user
    });
})

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',passport.authenticate('local'), (req,res)=>{
    
});

var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log('listen to port: ' + port + '/');
})