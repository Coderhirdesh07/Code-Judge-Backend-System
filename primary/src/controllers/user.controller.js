const cookie = require('cookie-parser');
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {redisConnection} = require('../database/cache.utils.js');

async function handleUserRegisterRoute(request, response) {
  const { firstName, userName, email, roleType, password } = request.body();
  if (!firstName || !userName || !email || !roleType || !password) {
    return response.status(400).json({
      message: 'FirstName or username or email or password or roleType missing',
    });
  }
  const token = User.generateJwtToken();

  const user = await User.create({
    firstName: firstName,
    userName: userName,
    email: email,
    roleType: roleType,
  });
  return response
    .cookie('token')
    .status(200)
    .json({ message: 'User Created Succuesfully' });
}



async function handleUserLoginRoute(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: 'Email or password missing' });
  }

  const redisClient = redisConnection();
  const isEmailValid = redisClient.HGET('email');
  if(isEmailValid!=null){
    const isPasswordCorrect = bcrypt.compare(password,isEmailValid.password);  
    if(isPasswordCorrect){
      return response.status(200).json({message:'User Login Success'});
    }
    else return response.status(400).json({message:'Password or Email is incorrect'});
  }
  else{
    const isMatch = await User.compare(this.password, password);
    if (!isMatch)
      return response
        .status(400)
        .json({ message: 'Incorrect password or email' });

    else {
      redisClient.HSET(email,{password:isMatch});
      return response.status(200).json({ message: 'User Login Successfull' });
    }
  }
}

async function handleUserLogoutRoute(request, response) {
  const {email,password} = request.body;
  const redisClient = redisConnection();
  const isLogin = redisClient.HGET(email);
  if(isLogin==null) return response.status(400).json({message:'User is not login '});
  else{
    redisClient.HDEL(email);
  return response
    .clearCookie('token')
    .status(200)
    .json({ message: 'User Logout Successfull' });
  }
}

module.exports = {
  handleUserLoginRoute,
  handleUserLogoutRoute,
  handleUserRegisterRoute,
};


/**
 *  redis - >
 * key - email
 * value-{
 *  password,
 * }
 */