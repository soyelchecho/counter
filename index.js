const express = require('express');
/*   Declaracion Variables Node */
var bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const path = require('path');

var uri = 'mongodb+srv://stream:a123456789@counterstream1-wozj4.mongodb.net/test?retryWrites=true&w=majority';
var db = Mongoose.connect(uri).catch((error) => { console.log(error); });

const Contador = require('./modelos/contador');

var app = express(); //Definicion aplicacion como express
var contadorint = 3600;

app.use(express.static(path.join(__dirname, 'public'))); //Permitimos leer el directorio public
app.use(bodyParser.json()); // for parsing application/json

app.get('/restarContador', (req, res) => {
  Contador.find().exec().then(docs=>{
    var string = JSON.parse(JSON.stringify(docs[0]));
    tiempoactual = parseInt(string['counter'], 10);
    tiemponuevo = (tiempoactual -1);
    Contador.update({nombre:"contador"},{$set:{counter:tiemponuevo}})
    .exec()
    .then(result=>{
      res.status(200).json(tiemponuevo);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
  }).catch(err=>{
    res.status(500).json({error:err});
  });
});


app.post('/contador/:tiempoagregar', (req, res) => {
  var tiempoagregar = parseInt(req.params.tiempoagregar,10);
  var tiempoactual;
  var tiemponuevo;
  Contador.find().exec().then(docs=>{
    var string = JSON.parse(JSON.stringify(docs[0]));
    tiempoactual = parseInt(string['counter'], 10);
    tiemponuevo = (tiempoactual + tiempoagregar);
    Contador.update({nombre:"contador"},{$set:{counter:tiemponuevo}})
    .exec()
    .then(result=>{
      res.status(200).json(result);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
  }).catch(err=>{
    res.status(500).json({error:err});
  });
});

//listo
app.post('/reinciarContador', (req, res) => {
  Contador.update({nombre:"contador"},{$set:{counter:3600}})
  .exec()
  .then(result=>{
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

app.listen(3000, function () {
  console.log('Server escuchando en puerto:  ' + 3000);
});
