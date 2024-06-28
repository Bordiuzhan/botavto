const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExitSchema = new Schema({
  licensePlate: { type: String, required: true },
  exitTime: { type: Date, default: Date.now },
});

const ExitModel = mongoose.model("Exit", ExitSchema);

module.exports = ExitModel;
