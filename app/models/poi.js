"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  longitude: Number,
  latitude: Number,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  image: [
    {
      type: Schema.Types.ObjectID,
      ref: "Image",
    },
  ],
});

module.exports = Mongoose.model("poi", poiSchema);
