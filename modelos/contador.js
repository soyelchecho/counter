const Mongoose = require('mongoose');

const counter = Mongoose.Schema({
    counter :{ type: Number  ,default: 3600},
    nombre: {type:String,default:"contador"},
});

module.exports = Mongoose.model('Counter',counter);
