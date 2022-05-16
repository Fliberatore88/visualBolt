const {check} = require ('express-validator');

const usersValidation = [
  check('name').trim().notEmpty().withMessage('You must complete the field name').bail().isLength({min: 3}).withMessage('Name must have at least 3 characters'),
  check('lastname').trim().notEmpty().withMessage('You must complete the field Lastname').bail().isString().withMessage('Lastname must contain only letters'),
  check('email').trim().notEmpty().withMessage('You must complete the field Email').bail().isEmail().withMessage('Email must be a correct email'),
  check('password').trim().notEmpty().withMessage('You must complete the field password').bail().isLength({min: 8}).withMessage('Password must contain at least 8 characters').matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$', 'g').withMessage(' Password must contain at least 8 characters, 1 Cap, 1 number, 1 lower case and a special character'),
  check('confirmPassword').notEmpty().withMessage('You must complete the field confirm Password').bail().custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation dosent match with the password');
        }
        return true
      })
]

module.exports = usersValidation;