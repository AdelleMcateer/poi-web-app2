'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
  name: String,
  comment: String,
  rating: String,
  Point:{
    type: Schema.Types.ObjectId,
    ref: 'Point '
  },
});

module.exports = Mongoose.model('Review', reviewSchema);
