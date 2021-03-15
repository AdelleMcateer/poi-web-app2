"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
  public_id: String,
  url: String,
  point: {
    type: Schema.Types.ObjectId,
    ref: "poi",
  },
});

module.exports = Mongoose.model("Image", imageSchema);
