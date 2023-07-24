const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connection to database'));

db.once('open',function(){
    console.log('Successfully connected to database');
})

module.exports = db;