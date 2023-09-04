const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { BaseError } = require('../libs');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new BaseError('Authentication failed', 401);
  }
  const valid = user.verfiyPassword(password);
  if (!valid) {
    throw new BaseError('Authentication failed', 401);
  }
  const token = jwt.sign({ id: user.id, email: user.userName }, JWT_SECRET, { expiresIn: '7d' });
  return {
    token,
  };
};

const signUp = async (data) => {
  const user = await User.create(data);
  if (!user) {
    throw new BaseError('SignUp failed', 500);
  }
};

module.exports = {
  login,
  signUp,
};
