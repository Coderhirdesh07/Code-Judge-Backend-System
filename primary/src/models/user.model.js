const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { timeStamp } = require('console');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    roleType:{
        type:String,
        enum:['Admin','Contributer','Student']
    }
},{timeStamps:true});


// some methods for hashing the password and generating tokens





const User = mongoose.model('User',userSchema);

module.exports = User;