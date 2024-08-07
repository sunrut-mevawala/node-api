const express = require('express');
const postController = require('../controller/post.controller'); 
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'images/' });
// Route to handle formData


router.get('/getAllPosts',postController.getAllPosts);
router.post('/insertPost',upload.single('file'),postController.insertPost);
router.put('/updatepost/:id' , postController.updatePost);
router.delete('/deletepost/:id', postController.deletePost);

module.exports = router;