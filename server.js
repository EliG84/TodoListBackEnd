const express = require('express');
const cors = require('cors');
const mongoConnect = require('./Data/mongo');

mongoConnect();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./Routes/userRouter');

app.use('/authUser', userRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
