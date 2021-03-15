"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: [
    {
      type: Schema.Types.ObjectID,
      ref: "Image",
    },
  ],
});

module.exports = Mongoose.model("poi", poiSchema);
