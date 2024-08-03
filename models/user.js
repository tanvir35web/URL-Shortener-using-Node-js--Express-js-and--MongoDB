const mongoose = require("mongoose");

const uesrSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
  }
}, { timestamps: true });

const User = mongoose.model("user", uesrSchema);
module.exports = User;