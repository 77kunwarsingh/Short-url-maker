const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    password: {
        type : String,
        required: true,
    },
},{timestamp: true});

const User = mongoose.model('User' , UserSchema);

module.exports = User;