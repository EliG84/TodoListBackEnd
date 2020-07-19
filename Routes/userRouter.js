const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const User = require('../Models/User');
const {
  authToken,
  authEmail,
  authSignup,
  authSignin,
} = require('../Middleware/auth');
const router = express.Router();

router.get('/getTodos', authToken, async (req, res) => {
  let user = await User.findById(req.body.userId);
  res
    .status(200)
    .json({ logged: true, body: _.pick(user, ['_id', 'email', 'todos']) });
});

router.post('/signin', authSignin, async (req, res) => {
  res.status(200).json({
    logged: true,
    token: req.body.userToken,
    body: _.pick(req.body.userData, ['_id', 'email', 'todos']),
  });
});

router.post('/signup', authEmail, authSignup, async (req, res) => {
  let user = await User.create(req.body);
  let token = jwt.sign({ id: user._id, email: user.email }, config.get('key'));
  res.status(200).json({
    logged: true,
    token,
    body: _.pick(user, ['_id', 'email', 'todos']),
  });
});

router.post('/addTodo', authToken, async (req, res) => {
  let newTodo = { name: req.body.name, date: req.body.date };
  await User.updateOne({ _id: req.body.userId }, { $push: { todos: newTodo } });
  let user = await User.findById(req.body.userId);
  res.status(200).json(user.todos);
});

router.get('/delTodo/:id', authToken, async (req, res) => {
  const id = req.params.id;
  let data = await User.updateOne(
    { _id: req.body.userId },
    { $pull: { todos: { _id: id } } },
    { safe: true, multi: true }
  );
  if (data.nModified) {
    let user = await User.findById(req.body.userId);
    res.status(200).json(user.todos);
  } else {
    res.status(400).json('Task was not removed');
  }
});

module.exports = router;
