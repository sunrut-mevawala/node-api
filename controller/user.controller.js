const userService = require('../services/user.service');
const userModel = require('../models/user.model');

exports.inserUser = async (req,res) =>{
    const reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.phone){
        return res.status(400).send({status:false, message:"Inputs can not be empty." })    
    }

    return userService.InsertUserDB(reqBody, res);
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const reqBody = req.body;
    console.log (userId);
    if (!userId) {
        return res.status(400).send({status: false, message: "User ID is required."});
    }
    if (!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.phone) {
        return res.status(400).send({status: false, message: "Inputs cannot be empty."});
    }
    return userService.UpdateUserDB(reqBody,res);
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ status: false, message: "User ID is required." });
    }

    const result = await userService.deleteUser(userId);

    if (result.status) {
        return res.status(200).send(result);
    } else if (result.message === 'User not found') {
        return res.status(404).send(result);
    } else {
        return res.status(500).send(result);
    }
    return userService.deleteUser(reqBody,res);
};

exports.getAllUser = async(req,res)=>{  
    try{
     const getUser = await userModel.find();
     if(!getUser){
        return res.status(200).send({status:false, message:'Data not found'});
     }
     return res.status(200).send({status:true, data: getUser})
    }catch(err){
        return res.status(500).send({status:false, message: err.message});
    }
};