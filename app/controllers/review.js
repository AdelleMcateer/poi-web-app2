'use strict';
const Point = require('../models/poi');
const User = require('../models/user');
const Review = require('../models/review');
const Joi = require("@hapi/joi");

const Reviews = {

  listReview: {
    handler: async function(request, h) {
      const reviews = await Review.find().populate('point');
      const points = await Point.find().lean();
      //const points = await Point.find().populate('point')

      return h.view('reviews', {
        title: 'List of Reviews',
        reviews: reviews,
        points: points
      });
    }
  },
  addReview: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        //const user = await User.findById(id);
        const data = request.payload;
        console.log(data);

        const rawPoint = request.payload.point;
        console.log(rawPoint);
        const point = await Point.findOne({name: rawPoint});

        console.log(point);
        const newReview = new Review({
          comment: data.comment,
          rating: data.rating,
          //point: data.point.name,
          //point: point._id,
          point: data.point._id,

        });
        console.log(newReview);
        await newReview.save();
        return h.redirect('/listreview');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
};

module.exports = Reviews;