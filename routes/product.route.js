const express = require('express');
const productController = require('../controller/product.controller'); 
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploaded files
      cb(null, 'images/'); // Replace 'uploads/' with your desired directory
    },
    filename: function (req, file, cb) {
      // Define the file name for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname); // Get the file extension
      cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});
// Configure multer for file uploads
const upload = multer({ storage: storage });
// Route to handle formData


router.get('/getAllProducts',productController.getAllProducts);
router.post('/insertProduct',upload.array('files',10),productController.insertProduct);
router.put('/updateProduct/:id' ,upload.array('files',10), productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;