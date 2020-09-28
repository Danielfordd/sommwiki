const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { User } = require('../../db/models');
const { authenticated, generateToken } = require('./security-utils');
const bcrypt = require('bcryptjs');

const router = express.Router();

const validateLogin =[
    check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address.')
    .isLength({ max: 150 })
    .withMessage('Email address must not be more than 150 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 60 })
    .withMessage('Password must not be more than 60 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 60 })
    .withMessage('Confirm Password must not be more than 60 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
]

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }
    const password = req.body
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await User.build(req.body);
    newUser.setPassword(details.password);
    await newUser.save();
    const { jti, token } = generateToken(newUser);
    newUser.tokenId = jti;
    await newUser.save();
    res.cookie("token", token);
    res.json({ token, User: {...newUser} });
}));

module.exports = router;
