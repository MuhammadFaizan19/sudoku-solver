const mongoose = require('mongoose');
const Image=require('./images');

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/images', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    connectToMongo,
    Image
}