const express=require('express');
var app=express();
var port=3000;

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/appdb');

// app.get("/",(req,res)=>{
//     res.send("Hello World !!");
// });

var regchema={
    firstname:
        {type:String},
    lastname:
        {type:String},
    address:
        {type:String},
    email:
        {type:String},
    username:
        {type:String},
    password:
        {type:String},
    gender:
        {type:String}
};

var Register=mongoose.model('Register',regchema);

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.post('/addreg',(req,res)=>{
    var register=new Register(req.body);

    register.save().then((docs)=>{
        res.send("Saved to datbase");
    },(err)=>{
        res.status(400).send("Unable to save to databse");
    });
});

// app.post('/addreg',(req,res)=>{
//     var register=new Register(req.body);
//     register.save({},(err, results)=> {
//         res.render('view', { 'title':'Registers List', 'results':results});
//     });
// });

app.get('/view',(req,res)=> {
    Register.find({},(err, results)=> {
        res.render('view', { 'title':'Registers List', 'results':results});
    });
});


app.listen(port,()=>{
    console.log("server listening port "+port);
});
