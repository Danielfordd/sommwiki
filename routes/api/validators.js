const { check } = require('express-validator');
const { User } = require('../../db/models');

const emailSignUpValidator =
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address.')
    .isLength({ max: 150 })
    .withMessage('Email address must not be more than 150 characters long')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    })
    .normalizeEmail();

const emailValidator =
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an email address.')
      .isLength({ max: 150 })
      .withMessage('Email address must not be more than 150 characters long')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail();

const passwordValidator =
  check('password')
    .not().isEmpty()
    .withMessage('Please provide a password')
    .isLength({ max: 60 })
    .withMessage('Password must not be more than 60 characters long')


const confirmPasswordValidator =
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
  });

const firstNameValidator =
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name')
    .isLength({ max: 60 })
    .withMessage('First name must be less then 60 characters')

const lastNameValidator =
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name')
    .isLength({ max: 60 })
    .withMessage('Last name must be less then 60 characters')

const userNameValidator =
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a user name')
    .isLength({ max: 60 })
    .withMessage('User name must be less then 100 characters')

const validateSignup = [
  firstNameValidator,
  lastNameValidator,
  userNameValidator,
  emailSignUpValidator,
  passwordValidator,
  confirmPasswordValidator,
]

const validateLogin = [
  emailValidator,
  passwordValidator
]

module.exports ={
  validateSignup,
  validateLogin
}
