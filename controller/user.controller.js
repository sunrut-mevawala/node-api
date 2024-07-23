const userService = require('../services/user.service');

exports.inserUser = async (req,res) =>{
    const reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.phone){
        return res.status(400).send({status:false, message:"Inputs can not be empty." })    
    }

    return userService.InsertUserDB(reqBody, res);
}