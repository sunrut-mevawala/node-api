const userModel = require('../models/user.model');
const {v4: uuid4} = require('uuid');

exports.InsertUserDB = async (userData, res) => {
    const user = new userModel({
        id: uuid4(),
        firstName : userData.firstName,
        lastName : userData.lastName,
        email: userData.email,
        phone: userData.phone
    });

    await user.save().then(() =>{
        return res.status(200).send({status:true, message: 'user inserted'});
    }).catch((err) =>{
        return res.status(500).send({status:false, message: `somthing went wrong: ${err.message}`});
    });
}