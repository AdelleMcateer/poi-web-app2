"use strict";

const Boom = require("@hapi/boom");
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');          // ADDED

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  //scope: Array,
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

userSchema.methods.comparePassword = async function(candidatePassword) {          // EDITED
  const isMatch = await bcrypt.compare(candidatePassword, this.password);         // EDITED
  if (!isMatch) {
    throw Boom.unauthorized('Password mismatch');
  }
  return this;
};
module.exports = Mongoose.model("User", userSchema);
