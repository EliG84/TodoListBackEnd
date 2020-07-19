const express = require('express');
const cors = require('cors');
const mongoConnect = require('./Data/mongo');

mongoConnect();

app.use(cors());
const app = express();
const port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require('./Routes/userRouter');

app.use('/authUser', userRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
