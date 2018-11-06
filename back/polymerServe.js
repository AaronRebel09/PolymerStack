// Node.js notation for importing packages
var express = require('express');

// Spin up a server
var app = express();

// Serve static files from the main build directory
app.use(express.static(__dirname + '/build/bundled'));

// Render index.html on the main page, specify the root
app.get('/', function(req, res){
    res.sendFile("index.html", {root: '.'});
});

// Tell the app to listen for requests on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});