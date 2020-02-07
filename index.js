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
app.get('/employee-entry',function(req,res){
    res.render('routes/dashboard');
});
app.get('/employee-details',function(req,res){
    res.render('routes/details');
});
app.get('/about',function(req,res){
    res.render('routes/about');
});
app.get('/reviews',function(req,res){
    res.render('routes/reviews');
});
app.get('/leave',function(req,res){
    res.render('routes/leave');
});
app.set('views',__dirname);
app.use(express.static(__dirname+'/'));


app.set('view engine','ejs');

app.listen('8000',function(){
    console.log('connected');
});