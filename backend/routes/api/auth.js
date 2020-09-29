const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const {  validateSignup, validateLogin } = require('./validators')
const { User } = require('../../db/models');
const { restoreUser, generateToken } = require('./security-utils');
const bcrypt = require('bcryptjs');

const router = express.Router();

//endpoint to generate 2nd token that
router.get('/getToken', (req, res) =>{
  res.json({ XSRFTOKEN:req.csrfToken()});
})

//full route /api/auth/signup
router.post('/signup', validateSignup, asyncHandler(async (req, res, next) => {
    // check for errors (validateLogin)
    const errors = validationResult(req);

    // if there are errors, stop the function and pass object to next error-handling middleware in app.js
    if (!errors.isEmpty()) {
      console.log(errors);
      return next({ status: 422, errors: errors.array() });
    }

    //destructure signup form's info
    const {
      firstName,
      lastName,
      userName,
      email,
      password
    } = req.body;

    //hash given password
    const hashedPassword = await bcrypt.hash(password, 10);

    //build a new user object
    const user = await User.create({
      firstName,
      lastName,
      username:userName,
      email,
      hashedPassword
    });


    //generate a token
    const { jti, token } = generateToken(user);

    //add token id to newUser
    user.tokenId = jti;

    //save newUser with tokenId to DB
    await user.save();

    //respond with a cookie token to be set in authentication reducer as initial state via loadUser() function
    res.cookie("token", token);
    //send back created token and user without password
    res.json({ token, user: user.toSafeObject()});
}));

//fullpath /api/auth/login put is used to update/replace an existing resource in DB
router.put('/login', validateLogin, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
      return next({ status: 422, errors: errors.array() });
    }

    //get email & password out of login form
    const { email, password } = req.body;

    //query DB by email
    const user = await User.findOne({ where: { email } });

    //if user is undefined then one wasnt found in our DB, send error to error handling middleware
    if(!user) {
      const err = new Error('Login failed');
      err.status = 404;
      err.title = 'Login failed';
      err.errors = ['No user with provided email found'];
      return next(err);
    }

    //compare given password (password) to stored password in db (user.hashedPassword.toString()), toString() is added because it is stored as binary
    const isValidPassword = bcrypt.compareSync(password, user.hashedPassword.toString())

    //if it is not a valid password, send error to error handling middleware
    if (!isValidPassword ) {
      console.log("Invalid password")
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid credentials'];
      return next(err);
    }

    //see signup above for comments about below.
    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();

    res.cookie('token', token);
    res.json({ token, user: user.toSafeObject()});
  }));

//full path /api/auth/logout
router.delete('/logout', [restoreUser], asyncHandler(async (req, res) => {
  //remove token from db & save user
  //restoreuser middleware is responsible for finding the user from DB
  req.user.tokenId = null;
  await req.user.save();

  //remove cookie from user's browser
  res.clearCookie('token');
  res.json({ message: 'success' });
}));

module.exports = router;
