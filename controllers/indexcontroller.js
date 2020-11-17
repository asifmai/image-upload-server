const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs');
const Image = require('../models/Image');

module.exports.index_get = async (req, res, next) => {
  const images = await Image.find().sort({createdAt: 'desc'});
  res.render('index', {images});
}

module.exports.images_get = async (req, res) => {
  const images = await Image.find().sort({createdAt: 'desc'});
  res.status(200).json({images});
}

module.exports.delete_get = async (req, res, next) => {
  const foundImage = await Image.findById(req.params.id);
  if (foundImage) {
    const imagePath = path.resolve(__dirname, `../public/img/${foundImage.fileName}`);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Image.findByIdAndRemove(req.params.id);
  }
  res.redirect('/');
}

module.exports.upload_post = async (req, res) => {
  const fileExtension = req.files.image.name.split('.').pop();
  const fileName = uuid();
  const fullFileName = fileName + '.' + fileExtension;
  const filePath = path.resolve(__dirname, `../public/img/${fullFileName}`);
  
  const newImage = new Image({
    fileName: fullFileName,
  })
  await newImage.save();

  req.files.image.mv(filePath, (err) => {
    return res.redirect('/');
  })
}