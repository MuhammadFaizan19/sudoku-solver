const mongoose = require('mongoose');
const Image=require('./images');

const connectToMongo = () => {
    mongoose.connect('mongodb+srv://MuhammadFaizan:pass1234@cluster0.kkmeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = {
    connectToMongo,
    Image
}