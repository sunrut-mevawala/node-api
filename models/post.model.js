const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: { 
    type: String,
    required: true,
    unique: true 
},
  userName: { 
    type: String,
    required: true,
    default:''
},
  userId: { 
    type: String,
    required: true
},
  postTitle: {
    type: String,
    required: true,
    default:''
},
  postDescription: {
    type: String,
    required: true,
    default:''
},
  createdDate: { 
    type: Date,
    required: true
},
  updateDate: {
    type: Date,
},
  imageUrl: {
    type: String, 
    required: true,
    default:''
},
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
