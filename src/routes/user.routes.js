const express = require('express');
const checkToken =require('../middleware/checktoken');
const {check} = require('express-validator');
const userController = require('../controllers/user.controller');


const router = express.Router();

router.post('/signup',
  [
      check('name').not().isEmpty(),
      check('email').normalizeEmail().isEmail(),
      check('password').isLength({min:6})
  ] ,
  userController.signup     
);

router.post('/login', userController.login);

router.use(checkToken);
module.exports= router;