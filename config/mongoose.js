const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Chandra:kusam%40123@cluster0.fjtcy3u.mongodb.net/ecommerce');
// mongodb://127.0.0.1:27017/SocialMedia
// mongodb+srv://Chandra:kusam%40123@cluster0.fjtcy3u.mongodb.net/ecommerce
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;