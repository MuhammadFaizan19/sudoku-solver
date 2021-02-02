var db = require('./Database/database');
const p = require('python-shell');

exports.getImages = (req, res) => {
    db.Image.find()
        .then((images) => {
            res.json(images);
        })
        .catch((error) => res.send(error))
};

exports.createImage = (req, res) => {
    db.Image.create({
        imagePath: req.file.path
    })
        .then((newImage) => {
            p.PythonShell.run('main.py', { mode:'text',scriptPath: "./project/src/", pythonOptions:['-u'],args: [JSON.stringify(".\\"+newImage.imagePath)] },(err,result)=>{
                if(err) console.log(err)
            })
            res.status(201).json(newImage)
        })
        .catch((error) => res.send(error));
}



module.exports = exports;