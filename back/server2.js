//version inicial

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var requestjson = require('request-json');

var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type,Accept");
  next();
});
var path = require('path');
var urlMovimientos = "https://api.mlab.com/api/1/databases/bdbanca3mb432474/collections/movimientos?apiKey=N3wzJPfZdiyJyhFSAaRngp0cxlTIGFPU";
var urlUsuarios = "https://api.mlab.com/api/1/databases/bdbanca3mb432474/collections/usuarios?apiKey=N3wzJPfZdiyJyhFSAaRngp0cxlTIGFPU";



var clienteMLab= requestjson.createClient(urlMovimientos);
var usuariosMLab= requestjson.createClient(urlUsuarios);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

// app.get('/',function(req, res){
//     res.sendFile(path.join(__dirname,'index.html'));
// //regresa un json con 3 clientes ficticios
// });

app.get("/", (req, res, next) => {
    res.json(['Tony','Lisa','Michael','Ginger','Food']);
});

app.get('/clientes/:idcliente',function(req,res){
  res.send('Aquí tiene el cliente número:'+req.params.idcliente);
});

app.get('/movimientos', function(req,res){
  clienteMLab.get('',function(err,resM,body){
    if(err){
      console.log(err);
    }else{
      res.send(body);
    }
  });
});

app.post ('/movimientos',function(req, res){
  clienteMLab.post('',req.body,function(err,resM,body){
    if(err){
      console.log(err);
    }else{
      res.send(body);
    }
  });
});

app.post ('/usuarios',function(req, res){
  usuariosMLab.post('',req.body,function(err,resM,body){
    if(err){
      console.log(err);
    }else{
      res.send(body);
    }
  });
});

// app.post ('/',function(req, res){
//   res.send('Su peticion ha sido recibida cambiada')
//
// });
//
// app.delete ('/',function(req, res){
//   res.send('Su peticion delete ha sido recibida')
//
// });
//
// app.put ('/',function(req, res){
//   res.send('Su peticion put ha sido recibida')
//
// });
