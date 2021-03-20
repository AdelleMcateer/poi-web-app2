"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const categorySchema = new Schema({
  categoryName: String,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Category", categorySchema);
