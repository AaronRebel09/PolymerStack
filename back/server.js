const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

var db;

//username = test-user
//pass = testuser1

MongoClient.connect('mongodb://test-user:testuser1@ds151863.mlab.com:51863/mongod', function(err, database){
    //.. start the server
    if(err) return console.log(err);
    db = database;
    app.listen(3000, function(){
        console.log('listening to port 3000');
    })
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    //res.send('This is a GET');
    //res.sendFile(__dirname + '/index.html')
    var cursor = db.collection('todo').find().toArray( function(err, results){
        console.log(results);
    });
    console.log(cursor);
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