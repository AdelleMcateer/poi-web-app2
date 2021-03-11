"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const categorySchema = new Schema({
  method: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Category", donationSchema);
