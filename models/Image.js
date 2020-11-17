const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Image', ImageSchema);