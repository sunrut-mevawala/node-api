const mongoose = require('mongoose');
const schema = new mongoose.Schema({
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
    }

});

const User = new mongoose.model('Users',schema);
module.exports = User; 