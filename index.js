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
    localStorage.clear();
    console.log(localStorage.getItem('uid'));
});

app.get('/register',function(req,res){
    res.render('routes/register');
});
app.get('/employee-entry',function(req,res){
    res.render('routes/dashboard');
   
});
app.get('/employee-update/:id',function(req,res){
    var uid = req.params.id;
    connection.query("SELECT * FROM `employee-details` WHERE `uid`="+uid,function(err,results,fields){
        if(err){
            throw err;
        }
        else{     
                
                 
                 console.log(results[0]);
                 res.render('routes/employee-update',{ employee: results[0]});
            }
            
    });
   
});
app.get('/employee-details',function(req,res){
    connection.query("SELECT * FROM `employee-details` WHERE `uid`="+localStorage.getItem('uid'),function(err,results,fields){
        if(err){
            throw err;
        }
        else{     
                
                 
                 console.log(results);
                 res.render('routes/details',{ employee: results});
            }
            
    });
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
    connection.query("SELECT * FROM `employee-details`",function(err,results,fields){
        if(err){
            throw err;
        }
        else{     
                
                 
                 console.log(results);
                 res.render('routes/employee-edit',{ employee: results});
            }
            
    });
});
app.get('/leave-approval',function(req,res){
    connection.query("SELECT * FROM `leave_table` WHERE `approval`=0",(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results);
            res.render('routes/leave-approval',{employee:results});
        }
    });
    
});
app.get('/review-details',function(req,res){
    connection.query("SELECT * FROM `review`",(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.render('routes/display-reviews',{employee:results});
        }
    });
    
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
    
                var sql1 = "SELECT uid FROM login WHERE `email`="+email; 
                connection.query(sql1,function(err,results,fields)
                {
                    if(!err){
                        //console.log("Inserted");
                        console.log(results[0].uid);
                        localStorage.setItem('uid', results[0].uid);
                        myValue = localStorage.getItem('uid');
                        console.log(myValue);
                        
                    }else{
                        throw err;
                    }
                    
                });     
    
        return res.redirect('/employee-entry');
    }
});

app.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM login WHERE email='"+email+"'";
    connection.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }
        else{
            console.log("The solution is : ",results);
            if(results.length > 0){
                if(results[0].password == password){
                    var sql1 = "SELECT uid FROM login WHERE `email`="+email; 
                    connection.query(sql,function(err,results,fields)
                    {
                        if(!err){
                            //console.log("Inserted");
                            console.log(results[0].uid);
                            localStorage.setItem('uid', results[0].uid);
                            myValue = localStorage.getItem('uid');
                            console.log(myValue);
                            
                        }else{
                            throw err;
                        }
                        
                    });   
                    return res.redirect('/employee-entry');
                }
                else{
                    res.send("Email and password doesnt match");
                }
            }
            else{
                res.send("Email doesnt exist");
            }
        }
    });
   
    
});
app.post('/details-entry',(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var startdate = new Date(req.body.startdate).toDateString();
    var jobtitle = req.body.jobtitle;
    var type= req.body.type;
    var city = req.body.city;
    var designation = req.body.designation;
    var team = req.body.team;
    var manager= req.body.manager;
    var salary = req.body.salary;
    var dateofsalary = new Date(req.body.dateofsalary).toDateString();
    var uid =  localStorage.getItem('uid');
    var sql = "INSERT INTO `employee-details`(`fname`,`lname`,`start_date`,`job_title`,`type`,`city`,`designation`,"+
    "`team`,`manager`,`salary`,`salary_date`,`uid`) VALUES('"+fname+"','"+lname+"','"+startdate+"','"+jobtitle+"','"+
    type+"','"+city+"','"+designation+"','"+team+"','"+manager+"',"+salary+",'"+dateofsalary+"',"+uid+")";
    connection.query(sql,(err)=>{
        if(!err){
            console.log("Insert");
        }else
        {
            console.log(err);
        }
        
    });
    return  res.redirect('/employee-entry');
   
   

});

app.post('/reviews',(req,res)=>{
    var rating = req.body.rating;
    var subject = req.body.subject;
    var description = req.body.description;
    var uid =  localStorage.getItem('uid');
    var sql = "INSERT INTO `review` VALUES("+rating+",'"+subject+"','"+description+"',"+uid+")";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Inserted');
        }
    });
    return res.redirect('/reviews');
});

app.post('/leave',(req,res)=>{
    var days = req.body.days;
    var fromdate =new Date(req.body.fromdate).toDateString();
    var todate = new Date(req.body.todate).toDateString();
    var subject = req.body.subject;
    var message = req.body.message;
    var uid =  localStorage.getItem('uid');
    var sql = "INSERT INTO `leave_table`(`days`,`from_date`,`to_date`,`subject`,`message`,`user_rid`) VALUES("+days+",'"+
    fromdate+"','"+todate+"','"+subject+"','"+message+"',"+uid+")";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Inserted");
        }
    });
    return res.redirect('/leave');
});
app.post('/admin-login',(req,res)=>{
    var email = req.body.email;
    var sql = "SELECT * FROM login WHERE email='"+email+"'";
    connection.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }
        else{
            console.log("The solution is : ",results);
            
                
                    var sql1 = "SELECT uid FROM login WHERE `email`="+email; 
                    connection.query(sql,function(err,results,fields)
                    {
                        if(!err){
                            //console.log("Inserted");
                            console.log(results[0].uid);
                            localStorage.setItem('uid', results[0].uid);
                            myValue = localStorage.getItem('uid');
                            console.log(myValue);
                            
                        }else{
                            throw err;
                        }
                        
                    });   
                    return res.redirect('/employee-edit');
                }
               
            });
            
        
 
});
app.post('/employee-update/:id',(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var startdate = new Date(req.body.startdate).toDateString();
    var jobtitle = req.body.jobtitle;
    var type= req.body.type;
    var city = req.body.city;
    var designation = req.body.designation;
    var team = req.body.team;
    var manager= req.body.manager;
    var salary = req.body.salary;
    var uid= req.params.id;
    var dateofsalary = new Date(req.body.dateofsalary).toDateString();
    var sql = "UPDATE `employee-details` SET `fname`='"+fname+"',`lname`='"+lname+"',`start_date`='"+startdate+
    "',`job_title`='"+jobtitle+"',`type`='"+type+"',`city`='"+city+"',`designation`='"+designation+"',`team`='"+
    team+"',`manager`='"+manager+"',`salary`='"+salary+"',`salary_date`='"+dateofsalary+"' WHERE `uid`='"+uid+"'";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Updated");
        }
    });
    return res.redirect('/employee-edit');
});

app.get("/approve/:id",(req,res)=>{
    console.log(req.params.id);
    connection.query("UPDATE `leave_table` SET `approval`=1 WHERE user_rid="+req.params.id,(err)=>{
        if(err){
            console.log("Error");
        }else{
            console.log("Approved");
        }
    });
    return res.redirect("/leave-approval");
});

app.get("/deny/:id",(req,res)=>{
    connection.query("DELETE FROM `leave_table` WHERE user_rid="+req.params.id,(err)=>{
        if(err){
            console.log("Error");
        }else{
            console.log("denied");
        }
    });
    return res.redirect("/leave-approval");
});

app.listen(8000,function(){
    console.log('connected');
});