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

exports.UpdateUserDB = async (userData, res) => {
    const userId = userData.id;

    const updatedUser = await userModel.findByIdAndUpdate(
        userId, 
        {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone
        },
        { new: true }
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).send({ status: false, message: 'User not found' });
        }
        return res.status(200).send({ status: true, message: 'User updated successfully', data: updatedUser });
    })
    .catch(err => {
        return res.status(500).send({ status: false, message: `Something went wrong: ${err.message}` });
    });
};

exports.deleteUser = async (userId) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return { status: false, message: 'User not found' };
        }
        return { status: true, message: 'User deleted successfully' };
    } catch (err) {
        return { status: false, message: `Something went wrong: ${err.message}` };
    }
};


