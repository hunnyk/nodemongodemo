const express=require('express');
const bodyParser=require('body-parser');
var app=express();
const {ObjectID}=require('mongodb').ObjectID;
var port=3000;
const _ =require('lodash');

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

//Get All Registers
app.get('/',(req,res)=> {
    Register.find({},(err, results)=> {
        res.render('view', { 'title':'Registers List', 'results':results});
    });
});

//Add Registers
app.get('/add', function(req,res) {
    res.render('index.ejs');
});

app.post('/addreg',(req,res)=>{
    var register=new Register(req.body);

    register.save().then((docs)=>{
        res.redirect('/');
       // res.send("Saved to datbase");
    },(err)=>{
        res.status(400).send("Unable to save to databse");
    });
});

//Delete registers
//delete using param
app.get('/delete/:id',(req,res)=>{
    var id=req.params.id;

    Register.findByIdAndRemove(id).then((docs)=>{
        res.redirect('/');
    },(err)=>{
        res.status(400).send("Unable to delete records");
    });

});

// app.get('/delete/:id', (req, res) => {
//     var id = req.params.id;
//     //console.log(id);
//
//     Register.findByIdAndRemove(id,(err,done) => {
//         res.redirect('/');
//         // res.send("Record deleted");
//     },(e)=>{
//         res.status(400).send("Unable to delete records");
//     });
// });


//delete using query
// app.get('/delete', (req, res) => {
//     var id = req.query.id;
//     //console.log(id);
//
//     Register.findByIdAndRemove(id,(err,done) => {
//         res.redirect('/');
//         // res.send("Record deleted");
//     },(e)=>{
//         res.status(400).send("Unable to delete records");
//     });
// });

//Edit registers
app.get('/edit', function(req,res) {
    var id=req.query.id
    Register.findById({_id: id}).exec((err, register)=> {
        res.render("edit", {register: register});
    });
});


app.post('/update/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['firstname', 'lastname', 'address', 'email', 'username', 'password', 'gender']);
    //console.log(body);

    Register.findByIdAndUpdate(id, {$set: body}, {new: true}).then((docs)=>{
        res.redirect('/');
        // res.send("Saved to datbase");
    },(err)=>{
        res.status(400).send("Unable to edit to databse");
    });
});

//Port
app.listen(port,()=>{
    console.log("server listening port "+port);
});
