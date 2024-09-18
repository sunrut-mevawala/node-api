const productModel = require("../models/Product.model.js");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');




exports.getAllProducts = async(req,res)=>{

    try{
     const getProduct = await productModel.find();
     if(!getProduct){
        return res.status(200).send({status:false, message:'Data not found'});
     }
     return res.status(200).send({status:true, data: getProduct})
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
};

exports.insertProduct = async (req, res) => {
    const reqBody = req.body;
    const files = req.files;
    console.log(files);
    
    if (!reqBody.productTitle || !reqBody.productDescription || !reqBody.price || !reqBody.discountPercentage) {
      return res.status(400).send({ status: false, message: "Value can not be Empty" });
    }
    console.log(files.map((item) => item.filename));
    const newproduct = new productModel({
        id: uuidv4(),
        productTitle: reqBody.productTitle,
        productDescription: reqBody.productDescription,
        categoryId: reqBody.categoryId,
        createdDate: Date.now(),
        price: reqBody.price,
        discountPercentage: reqBody.discountPercentage,
        discountedPrice:reqBody.discountedPrice,
        productImage: files.map((item) => item.filename),
      });
    
      try {
        await newproduct.save();
        return res.status(200).send({ status: true, message: 'Product Added successfully' });
      } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
      }
}


exports.updateProduct = async (req, res) => {
    const reqParams = req.params;
    const reqBody = req.body;
    const proid = reqParams.id;
    const file = req.file;

if(!proid){
    return res.status(400).send({ status: false, message: 'Product id is required' });
}

if (!reqBody.productTitle || !reqBody.productDescription || !reqBody.price || !reqBody.discountPercentage) {
    return res.status(400).send({ status: false, message: "Value can not be Empty" });
  }

  const updateData = {
    productTitle: reqBody.productTitle,
    productDescription: reqBody.productDescription,
    updatedDate: Date.now(),
    price: reqBody.price,
    discountPercentage: reqBody.discountPercentage,
    // imageUrl: file ? file.filename : reqBody.imageUrl  
  };

  try{

    const productUpdate = await productModel.findOneAndUpdate({ id: proid}, updateData, {new: true});
    if(!productUpdate){
        return res.status(404).send({ status: false, message: "Product Not Found"});
    }

    return res.status(200).send({ status: true, meaasge:"Product Updated Successfully", data: productUpdate});
  }catch (err) {
    return res.status(500).send({ status: false, message: err.meaasge});
  }
};

exports.deleteProduct = async (req, res) => {
    const reqParams = req.params;
    const proid = reqParams.id;
  
    if (!proid) {
      return res.status(400).send({ status: false, message: 'Product id is required' });
    }
  
    try {
      const productDelete = await productModel.findOneAndDelete({ id: proid });
      if (!productDelete) {
        return res.status(404).send({ status: false, message: 'Prduct Not Found' });
      }
      productDelete.productImage.forEach((item) =>{
        const filePath = 'images/'+item;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error removing file: ${err}`);
            return res.status(500).send({ status: false, message: err.message });
          }
          console.log(`File ${filePath} has been successfully removed.`);
        });
      })
      
      return res.status(200).send({ status: true, message: 'Product deleted successfully' });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };