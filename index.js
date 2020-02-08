var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")
var mysql = require("mysql")
var localStorage = require('localStorage')
var uid;
const connection = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "",
    database:"employee"
});
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
app.get('/admin',function(req,res){
    res.render('routes/admin-login');
});
app.get('/employee-edit',function(req,res){
    res.render('routes/employee-edit');
});
app.get('/leave-approval',function(req,res){
    res.render('routes/leave-approval');
});
app.set('views',__dirname);
app.use(express.static(__dirname+'/'));


app.set('view engine','ejs');

app.post('/register',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var sql = "INSERT INTO login(`email`,`password`) VALUES ('"+email+"','"+password+"')";
    if(password.length>5 && cpassword == password){
                connection.query(sql,function(err)
                {
                    if(!err){
                        console.log("Inserted");
                        
                    }else{
                        throw err;
                    }
                    
                });
                
        
    
        return res.redirect('/employee-entry');
    }
});


app.listen(8000,function(){
    console.log('connected');
});