"use strict";

const Poi = require("../models/poi");
const User = require("../models/user");
const Joi = require("@hapi/joi");

const Points = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add an point of interest" });
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
      const newPoi = new Poi({
        name: data.name,
        description: data.description,
        contributor: user._id,
      });
      await newPoi.save();
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
  updatePoi: {
    handler: async function (request, h) {
      try {
        const pointEdit = request.payload;
        const id = request.params.id;
        const point = await Poi.findById(id);
        point.name = pointEdit.name;
        point.description = pointEdit.description;

        await point.save();

        return h.redirect("/point-list/" + point._id);
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
