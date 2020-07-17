const express = require('express');
const mongoConnect = require('./DB/mongo');
const { unary } = require('lodash');

mongoConnect();

const app = express();
const port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
