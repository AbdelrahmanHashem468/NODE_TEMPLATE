/* eslint-disable consistent-return */
const express = require('express');
const { userController } = require('../controllers');
const { asycnWrapper } = require('../libs');
const { validation, UsersValidator } = require('../middlewares/validation');
const { BaseError } = require('../libs');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/login', validation(UsersValidator.login), async (req, res, next) => {
  const { body: { email, password } } = req;
  const user = userController.login(email, password);
  const [error, data] = await asycnWrapper(user);
  if (error) {
    return next(error);
  }
  res.status(200).json({ token: data.token });
});

router.post('/signUp', validation(UsersValidator.signUp), async (req, res, next) => {
  const {
    body: {
      firstName, lastName, email, password, DOB,
    },
  } = req;
  console.log('ttttttttttttt');
  const user = userController.signUp({
    firstName, lastName, email, password, DOB,
  });
  const [error, data] = await asycnWrapper(user);
  if (error) {
    return next(error);
  }
  res.status(201).json();
});

router.use(auth);

router.get('/search', async (req, res, next) => {
  res.status(200).json({ status: 'Authenticated' });
});
module.exports = router;
