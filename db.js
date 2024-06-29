const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Успішно підключено до MongoDB"))
  .catch((e) => console.log("Підключення до MongoDB не вдалося", e));

module.exports = mongoose;
