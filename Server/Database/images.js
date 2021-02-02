let mongoose = require('mongoose');


let imageSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    }
})

let Image = mongoose.model('Game', imageSchema);
module.exports = Image;