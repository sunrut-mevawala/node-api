// const postModel = require('../models/post.model');
// const {v4: uuid4} = require('uuid');

// exports.inserpost = async (postData, res) =>{
// const newPost = new postModel({
//     id: uuid4(),
//     userName: postData.userName,
//     userId: postData.userId,
//     postTitle: postData.postTitle,
//     postDescription: postData.postDescription,
//     createdDate:Date.now(),
//     imageUrl: postData.imageUrl,
//   });

//   try {
//     await newPost.save();
//     return res.status(200).send({ status: true, message: 'Post created successfully' });
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message });
//   }
// }
