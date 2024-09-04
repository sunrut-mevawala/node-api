const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true,
        default: ''
    },
    lastName:{
        type: String,
        required: true,
        default: ''
    },
    email:{
        type: String,
        required: true,
        default: '',
        unique: true
    },
    phone:{
        type: String,
        required: true,
        default: '',
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        default:'user',
    },
    token:{
        type: String,
    }
});

userSchema.methods.verifyPassword = async (password) => {
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password);
    return isMatch;
}

const User = new mongoose.model('Users',userSchema);
module.exports = User; 