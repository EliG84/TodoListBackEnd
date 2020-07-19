const mongoose = require('mongoose');

module.exports = mongoConnet = () => {
  mongoose.connect(
    'mongodb+srv://speedtech:letsrock@speedtech.vyer8.gcp.mongodb.net/todoList1',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log('DB Error', err);
      else console.log('Connented to Atlas');
    }
  );
};
