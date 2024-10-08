const express = require('express');
const postController = require('../controller/post.controller'); 
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


router.get('/getAllPosts',postController.getAllPosts);
router.post('/insertPost',upload.single('file'),postController.insertPost);
router.put('/updatepost/:id' ,upload.single('file'), postController.updatePost);
router.delete('/deletepost/:id', postController.deletePost);

module.exports = router;