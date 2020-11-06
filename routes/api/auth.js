const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const {  validateSignup, validateLogin } = require('./validators')
const { User } = require('../../db/models');
const { restoreUser, generateToken } = require('./security-utils');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/getToken', (req, res) =>{
  res.json({ XSRFTOKEN:req.csrfToken()});
})

router.post('/signup', validateSignup, asyncHandler(async (req, res, next) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username:userName,
      email,
      hashedPassword
    });

    const { jti, token } = generateToken(user);

    user.tokenId = jti;

    await user.save();

    res.cookie("token", token);
    res.json({ token, user: user.toSafeObject()});
}));

router.put('/login', validateLogin, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if(!user) {
      const err = new Error('Login failed');
      err.status = 404;
      err.title = 'Login failed';
      err.errors = ['No user with provided email found'];
      return next(err);
    }

    const isValidPassword = bcrypt.compareSync(password, user.hashedPassword.toString())

    if (!isValidPassword ) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid credentials'];
      return next(err);
    }

    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();

    res.cookie('token', token);
    res.json({ token, user: user.toSafeObject()});
  }));

router.delete('/logout', [restoreUser], asyncHandler(async (req, res) => {
  req.user.tokenId = null;
  await req.user.save();

  res.clearCookie('token');
  res.json({ message: 'success' });
}));

module.exports = router;
