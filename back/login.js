const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const app = express();

var db;

//Mlab account
// user = aronrebel
// pass = Arielrebel1!

//Mongo mlab
//username = test-user
//pass = testuser1

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type,Accept");
    next();
});

MongoClient.connect('mongodb://test-user:testuser1@ds151863.mlab.com:51863/mongod', function(err, database){
    //.. start the server
    if(err) return console.log(err);
    db = database;
    app.listen(3000, function(){
        console.log('listening to port 3000');
    })
});

app.use(bodyParser.urlencoded({extended:true}));

// app.get('/', function(req, res){
//     //res.send('This is a GET');
//     //res.sendFile(__dirname + '/index.html')
//     var cursor = db.collection('todo').find().toArray( function(err, results){
//         console.log(results);
//     });
//     console.log(cursor);
//     res.json(cursor);
//     // return resp.send.json(["Tony","Lisa","Michael","Ginger","Food"]);
// });

app.get("/", (req, res, next) => {
    var cursor = db.collection('usuarios').find().toArray( function(err, results){
        // console.log(results);
        res.json(results);
    });
    // console.log(cursor);
    // res.json(['Tony','Lisa','Michael','Ginger','Food']);
});

app.post('/todo', function(req, res){
    //console.log('Hello');
    //console.log(req.body);
    db.collection('todo').save(req.body, function(err, result){
        if(err) return console.log(err);

        console.log('saved to ur db');
        res.redirect('/');
    })
});