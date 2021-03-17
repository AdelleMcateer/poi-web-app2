"use strict";

const ImageStore = require("../utils/image-store");
const Image = require("../models/image");
const Joi = require("@hapi/joi");
const Poi = require("../models/poi");
const Utils = require("../utils/isAdmin");
const User = require("../models/user");

const Points = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add an point of interest" });
    },
  },
  adminhome: {
    handler: async function (request, h) {
      const users = await User.find().populate().lean();
      return h.view("admin-menu", {
        title: "Admin Home",
        //categories: categories,
        users: users,
      });
    },
  },
  report: {
    handler: async function (request, h) {
      const user = await User.findById(request.auth.credentials.id);
      const point = await Poi.find().populate("contributor").lean();
      return h.view("report", {
        title: "Points of interest so far",
        point: point,
      });
    },
  },
  point: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const file = request.payload.imagefile;
      const image = await ImageStore.uploadImage(request.payload.imagefile);
      const newImage = new Image({
        imageURL: image.url,
      });
      await newImage.save();

      const newPoi = new Poi({
        name: data.name,
        description: data.description,
        contributor: user._id,
        category: data.category,
        image: newImage._id,
      });
      await newPoi.save();

      /*Image upload to cloudinary*/
      const imageFile = data.image;
      await ImageStore.uploadImage(imageFile, newPoi._id);

      return h.redirect("/report");
    },
  },

  showPoint: {
    handler: async function (request, h) {
      try {
        const id = request.params.id;
        const point = await Poi.findById(id);
        return h.view("updatepoint", { title: "Islands of Ireland - Update", point: point });
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
        point.name = updatePoint.name;
        point.description = updatePoint.description;

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
