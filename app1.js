const express=require('express');
var app=express();
var port=3000;

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.sendFile(__dirname + "/index.html");
});

app.post('/addreg',(req,res)=>{
    var register=new Register(req.body);

    register.save().then((docs)=>{
        res.send("Saved to datbase");
    },(err)=>{
        res.status(400).send("Unable to save to databse");
    });
});

app.get('/view',(req,res)=>{
    Register.find().then((docs)=>{
        res.send(docs);
    },(err)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log("server listening port "+port);
})
