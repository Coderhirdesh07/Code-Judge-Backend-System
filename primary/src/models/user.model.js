const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleType: {
      type: String,
      enum: ['Admin', 'Contributer', 'Problem-submitter'],
    },
  },
  { timeStamps: true }
);

// to save password hashing is done before save only is password is modified
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// for generating token
userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      email: this.email,
      username: this.userName,
      role: this.roleType,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
};

// for comparing password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.comparePassword(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
