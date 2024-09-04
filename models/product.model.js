const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { 
    type: String,
    required: true,
    unique: true 
},
  productTitle: { 
    type: String,
    required: true,
    default:''
},
  productDescription: { 
    type: String,
    required: true
},
  categoryId: {
    type: String,
    required: true
},
  createdDate: { 
    type: Date,
    required: true
},
  updatedDate: {
    type: Date
},
price: {
    type: Number,
    required: true,
    default:0
},
discountPercentage: {
    type: Number,
    default:0
},
discountedPrice: {
    type: Number,
    default:0
},
  productImage: [{
    type: String, 
    required: true,
    default:''
}],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
