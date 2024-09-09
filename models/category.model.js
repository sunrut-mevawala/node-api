const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  parentCategoryId: {
    type: String,
    default:"",
  },
});

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
