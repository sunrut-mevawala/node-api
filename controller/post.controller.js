const postModel = require("../models/post.model.js");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');

// exports.insertPost = async (req, res) => {
//     const reqBody = req.body;
//     if (!reqBody.userName || !reqBody.userId || !reqBody.postTitle || !reqBody.postDescription || !reqBody.imageUrl) {
//       return res.status(400).send({ status: false, message: "Value can not be Empty" });
//     }
//     return postservice.insertPost(reqBody.res);
// }

exports.insertPost = async (req, res) => {
  const reqBody = req.body;
  const file = req.file;
  
  console.log('Request Object',req.file);
  if (!reqBody.userName || !reqBody.userId || !reqBody.postTitle || !reqBody.postDescription) {
    return res.status(400).send({ status: false, message: "Value can not be Empty" });
  }

  const newPost = new postModel({
    id: uuidv4(),
    userName: reqBody.userName,
    userId: reqBody.userId,
    postTitle: reqBody.postTitle,
    postDescription: reqBody.postDescription,
    createdDate: Date.now(),
    imageUrl: file.filename,
  });

  try {
    await newPost.save();
    return res.status(200).send({ status: true, message: 'Post created successfully' });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const reqParams = req.params;
  const reqBody = req.body;
  const pid = reqParams.id;

  if (!pid) {
    return res.status(400).send({ status: false, message: 'Post id is required' });
  }

  if (!reqBody.userName || !reqBody.userId || !reqBody.postTitle || !reqBody.postDescription || !reqBody.imageUrl) {
    return res.status(400).send({ status: false, message: "Value can not be Empty" });
  }

  const updateData = {
    userName: reqBody.userName,
    userId: reqBody.userId,
    postTitle: reqBody.postTitle,
    postDescription: reqBody.postDescription,
    updateDate: Date.now(),
    imageUrl: reqBody.imageUrl,
  };

  try {
    const postUpdate = await postModel.findOneAndUpdate({ id: pid }, updateData, { new: true });
    if (!postUpdate) {
      return res.status(404).send({ status: false, message: 'Post Not Found' });
    }
    return res.status(200).send({ status: true, message: 'Post updated successfully', data: postUpdate });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const reqParams = req.params;
  const pid = reqParams.id;

  if (!pid) {
    return res.status(400).send({ status: false, message: 'Post id is required' });
  }

  try {
    const postDelete = await postModel.findOneAndDelete({ id: pid });
    if (!postDelete) {
      return res.status(404).send({ status: false, message: 'Post Not Found' });
    }
    const filePath = 'images/'+postDelete.imageUrl;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return res.status(500).send({ status: false, message: err.message });
      }
      console.log(`File ${filePath} has been successfully removed.`);
    });
    return res.status(200).send({ status: true, message: 'Post deleted successfully' });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.getAllPosts = async(req,res)=>{

    try{
     const getPost = await postModel.find();
     if(!getPost){
        return res.status(200).send({status:false, message:'Data not found'});
     }
     return res.status(200).send({status:true, data: getPost})
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
};
