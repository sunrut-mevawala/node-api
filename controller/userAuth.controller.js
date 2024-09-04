const { query } = require('express');
const jwt = require("jsonwebtoken");
const { findOne } = require('../models/post.model');
const userModel = require('../models/user.model');
const {v4: uuid4} = require('uuid');
const bcrypt = require ("bcrypt");


exports.userLogin = async(req, res) => {
    const reqBody = req.body;
    if(!reqBody.password && !reqBody.emailOrPhone){
        return res.status(500).send({status:false, message:'Inputs can not be empty!'});
    }
    
    try {
        
        const query = {
            $or: [
                { email: reqBody.emailOrPhone },
                { phone: reqBody.emailOrPhone }
            ]
        };
        const findUser = await userModel.findOne(query);     

        if(!findUser){
            return res.status(200).send({status:false, message: 'User is not registered'});
        }

        const validPassword = await bcrypt.compare(reqBody.password,findUser.password);

        if(!validPassword) {
            return res.status(200).send({status:false, message: 'User credentials are not matched!'});
        }
        const user = {
            id:findUser.id,
            userName: `${findUser.firstName}-${findUser.lastName}`,
            email: findUser.email,
            phone: findUser.phone,
            userType: findUser.userType
    };
        const token = jwt.sign(user, "MyNameIsSunrut007");
        await userModel.findOneAndUpdate({id:findUser.id},{token: token});
        return res.status(200).send({status:true, user: {user:user,token:token}});
    } catch (error) {
        return res.status(400).send({status: false, message: error.message});
    }
}

exports.userRegistration = async(req,res) =>{

    const reqBody = req.body;
    if(!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.phone || !reqBody.password){
        return res.status(400).send({status:false, message:"Inputs can not be empty." })    
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    const user = new userModel({
        id: uuid4(),
        firstName : reqBody.firstName,
        lastName : reqBody.lastName,
        email: reqBody.email,
        phone: reqBody.phone,
        password: hashedPassword
    });

    try{
        const query = {
            $or:[
                {email:reqBody.email},
                {phone:reqBody.phone}
            ]
        }

    const findUser = await userModel.findOne(query)

    if(findUser){
        return res.status(200).send({status:false, message:'User is already Ragistered'})
    }


    await user.save().then((result) =>{
        return res.status(200).send({status:true, message: 'user registered'});
    }).catch((err) =>{
        return res.status(500).send({status:false, message: `somthing went wrong: ${err.message}`});
    });
}catch (error) {
    return res.status(400).send({status: false, message: error.message});
}
};