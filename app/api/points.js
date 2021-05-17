"use strict";

const Category = require("../models/category");
const Point = require("../models/poi");
const Boom = require("@hapi/boom");
const utils = require("./utils.js");

const Points = {
  findAll: {
    //auth: false,
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      //const points = await Point.find();
      //return points;
      const points = await Point.find().populate("category").populate("point");
      return points;
    },
  },

  findByCategory: {
    //auth: false,
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const points = await Point.find({ category: request.params.id });
      return points;
    },
  },

  addPoint: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let point = new Point(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound("No Candidate with this id");
      }
      point.category = category._id;
      point.contributor = userId;
      point = await point.save();
      return point;
    },
  },

  deleteAll: {
    //auth: false,
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await [Point].deleteMany({});
      return { success: true };
    },
  },

};

module.exports = Points;