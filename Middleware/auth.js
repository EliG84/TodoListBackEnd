const User = require('../Models/User');
const config = require('config');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const validation = Joi.object({
    email: Joi.string()
})

const checkToken