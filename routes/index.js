const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');

/* GET - Public - home page */
router.get('/', indexController.index_get);

/* GET - Public - Upload Image */
router.post('/upload', indexController.upload_post);

/* GET - Public - Delete Image */
router.get('/delete/:id', indexController.delete_get);

/* GET - Public - Get Images */
router.get('/images', indexController.images_get);

module.exports = router;
