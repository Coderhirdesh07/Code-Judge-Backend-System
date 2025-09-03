const cookie = require('cookie-parser');
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {redisConnection} = require('../database/cache.utils.js');

async function handleUserRegisterRoute(request, response) {
  const { firstName, userName, email, roleType, password } = request.body;
  if (!firstName || !userName || !email || !roleType || !password) {
    return response.status(400).json({
      message: 'FirstName or username or email or password or roleType missing',
    });
  }


  const user = await User.create({
    firstName: firstName,
    userName: userName,
    email: email,
    roleType: roleType,
  });


  const token = jwt.sign({_id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1d'});


  return response
    .cookie('token',token,{httpOnly:true})
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
  try{
    const email = request.user.email;
    const redisClient = redisConnection();

    const isLogin = await redisClient.HGET(email,'password');
    if(!isLogin){
      return response.status(400).json({message:'User is not logged in'});
    }
    await redisClient.HDEL(email,'password');
    return response.status(200).json({message:'User logout sucess'});

  }
  catch(error){
    console.log(error);
    return response.status(500).json({message:'Internal server error'});
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