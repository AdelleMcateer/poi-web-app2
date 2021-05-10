"use strict";

const Category = require("../models/category");
const Point = require("../models/poi");
const Boom = require("@hapi/boom");

const Points = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const points = await Point.find();
      return points;
    },
  },

  findByCategory: {
    auth: false,
    handler: async function (request, h) {
      const points = await Point.find({ category: request.params.id });
      return points;
    },
  },

  addPoint: {
    auth: false,
    handler: async function (request, h) {
      let point = new Point(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound("No category with this id");
      }
      point.category = category._id;
      point = await point.save();
      return point;
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await [Point].deleteMany({});
      return { success: true };
    },
  },

};

module.exports = Points;