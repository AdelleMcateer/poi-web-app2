"use strict";

const Category = require("../models/category");
const ImageStore = require("../utils/image-store");
const Image = require("../models/image");
const Joi = require("@hapi/joi");
const Poi = require("../models/poi");
const User = require("../models/user");
const sanitizeHtml = require('sanitize-html');

const Points = {
  home: {
    handler: async function (request, h) {
      const categories = await Category.find().lean();
      return h.view("home", { title: "Add an point of interest", categories: categories });
    },
  },

  report: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(request.auth.credentials.id);
      const point = await Poi.find().populate("contributor").populate("category").lean();
      return h.view("report", {
        title: "Points of interest so far",
        point: point,
      });
    },
  },
  point: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        //const rawCategory = request.payload.category.split(",");
        const rawCategory = request.payload.category;
        const category = await Category.findOne({
          name: rawCategory,
        });

        const newPoi = new Poi({
          name: sanitizeHtml(data.name),
          description: sanitizeHtml(data.description),
          contributor: user._id,
          latitude:  sanitizeHtml(data.latitude),
          longitude:  sanitizeHtml(data.longitude),
          category: category._id,
          //review: review._id,
          //addedBy: user._id
        });
        await newPoi.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  showPoint: {
    handler: async function (request, h) {
      try {
        const id = request.params.id;
        //const point = await Poi.findById(id);
        const point = await Poi.findById(id).populate("category").lean().sort("-category");
        const category = await Category.find().lean();
        const categories = await Category.find().lean().sort("name");
        const user_id = request.auth.credentials.id;
        const user = await User.findById(user_id).lean();
        return h.view("updatepoint", { title: "Islands of Ireland - Update", point: point, categories: categories });
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });
      }
    },
  },
  updatePoint: {
    handler: async function (request, h) {
      try {
        const updatePoint = request.payload;
        const id = request.params.id;
        const point = await Poi.findById(id);
        point.description = updatePoint.description;
        point.latitude = updatePoint.latitude;
        point.longitude = updatePoint.longitude;

        await point.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  deletePoint: {
    handler: async function (request, h) {
      const id = request.params.id;
      const point = await Poi.findById(id);
      await point.delete();
      return h.redirect("/report");
    },
  },
};
module.exports = Points;
