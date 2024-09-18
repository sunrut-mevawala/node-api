const categoryModel = require("../models/category.model");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');

exports.getAllCategories = async(req,res)=>{

    try{
     const getCategory = await categoryModel.find();
     if(!getCategory){
        return res.status(200).send({status:false, message:'Data not found'});
     }
     return res.status(200).send({status:true, data: getCategory})
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
};

exports.insertCategory = async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);
  if (!reqBody.categoryName) {
    return res.status(400).send({ status: false, message: "Value can not be Empty" });
  }

  const newCategory = new categoryModel({
    id: uuidv4(),
    categoryName: reqBody.categoryName,
    parentCategoryId: reqBody.parentCategoryId,
  });

  try {
    await newCategory.save({newCategory});
    return res.status(200).send({ status: true, message: 'Category Added successfully' });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const reqParams = req.params;
  const reqBody = req.body;
  const cid = reqParams.id;

  if (!cid) {
    return res.status(400).send({ status: false, message: 'Category id is required' });
  }

  if (!reqBody.categoryName) {
    return res.status(400).send({ status: false, message: "Value can not be Empty" });
  }

  const updateData = {
    categoryName: reqBody.categoryName,
  };
  
  try {
    const categoryUpdate = await categoryModel.findOneAndUpdate({ id: cid }, updateData, { new: true });
    if (!categoryUpdate) {
      return res.status(404).send({ status: false, message: 'Category Not Found' });
    }
    return res.status(200).send({ status: true, message: 'Category updated successfully', data: categoryUpdate });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const reqParams = req.params;
  const cid = reqParams.id;
  console.log('delete');
  if (!cid) {
    return res.status(400).send({ status: false, message: 'Category id is required' });
  }

  try {
    const categoryDelete = await categoryModel.findOneAndDelete({ id: cid });
    if (!categoryDelete) {
      return res.status(404).send({ status: false, message: 'Category Not Found' });
    }
    return res.status(200).send({ status: true, message: 'Category deleted successfully' });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


