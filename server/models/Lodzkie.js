const mongoose = require("mongoose");

const lubelskieSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  placeId: String,
  address: String,
  category: String,
  phone: String,
  googleUrl: String,
  assignedTo: String,
  updatedAt: Number,
  storeName: String,
  ratingText: String,
  voivodeship: String,
  city: String,
  stars: Number, // Może być Double zamiast Number, zależy od potrzeb
  numberOfReviews: Number, // Może być Double zamiast Number, zależy od potrzeb
});

const LubelskieModel = mongoose.model(
  "Lodzkie",
  lubelskieSchema,
  "newCollection"
);

module.exports = LubelskieModel;
