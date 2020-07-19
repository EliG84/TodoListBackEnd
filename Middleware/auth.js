const User = require('../Models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const ValidationSchema = Joi.object({
  email: Joi.string().max(40).required(),
  password: Joi.string()
    .min(6)
    .max(19)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  rep_pass: Joi.ref('password'),
  answer: Joi.string().max(20).required(),
});

const authToken = (req, res, next) => {
  let token = req.header('x-auth-token');
  if (!token)
    return res.status(400).json({ logged: false, body: 'Token Not Available' });
  jwt.verify(token, config.get('key'), (err, decoded) => {
    if (err)
      return res.status(400).json({ loegged: false, body: 'Invalid Token' });
    req.body.userId = decoded.id;
    next();
  });
};

const authEmail = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ logged: false, body: 'User allready Exists' });
  next();
};

const authSignup = (req, res, next) => {
  const { error, value } = ValidationSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ logged: false, body: error.details[0].message });
  next();
};

const authSignin = async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ loegged: false, body: 'Invalid Loging' });
  let same = await bcrypt.compare(req.body.password, user.password);
  if (!same)
    return res.status(400).json({ logged: false, body: 'Incorrect Password' });
  req.body.userData = user;
  req.body.userToken = jwt.sign(
    { id: user._id, email: user.email },
    config.get('key')
  );
  next();
};

exports.authToken = authToken;
exports.authEmail = authEmail;
exports.authSignup = authSignup;
exports.authSignin = authSignin;
