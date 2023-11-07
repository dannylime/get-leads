const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({});

const UserModel = mongoose.model("customers2", UserSchema);
module.exports = UserModel;
