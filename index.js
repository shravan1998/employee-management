var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")

const app = express();

app.get('/',function(req,res){
    res.render('index');
});

app.get('/login',function(req,res){
    res.render('index');
});

app.get('/register',function(req,res){
    res.render('routes/register');
});
app.get('/dashboard',function(req,res){
    res.render('routes/dashboard');
});
app.set('views',__dirname);
app.use(express.static(__dirname+'/'));


app.set('view engine','ejs');

app.listen('8000',function(){
    console.log('connected');
});