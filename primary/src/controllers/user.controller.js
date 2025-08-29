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

  const isMatch = await User.compare(this.password, password);
  if (!isMatch)
    return response
      .status(400)
      .json({ message: 'Incorrect password or email' });

  return response.status(200).json({ message: 'User Login Successfull' });
}

async function handleUserLogoutRoute(request, response) {
  const redisClient = redisConnection();
  return response
    .clearCookie('token')
    .status(200)
    .json({ message: 'User Logout Successfull' });
}

module.exports = {
  handleUserLoginRoute,
  handleUserLogoutRoute,
  handleUserRegisterRoute,
};
