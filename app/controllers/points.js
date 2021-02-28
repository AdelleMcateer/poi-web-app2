"use strict";

const Poi = require("../models/poi");
const User = require("../models/user");

const Points = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add an point of interest" });
    },
  },
  report: {
    handler: async function (request, h) {
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

  showPoints: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("updatepoint", { title: "Islands of Ireland Settings", user: user });
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    },
  },

  updatePoint: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const updatepoint = new Poi({
        name: data.name,
        description: data.description,
        contributor: user._id,
      });
      await updatepoint.save();
      return h.redirect("/report");
    },
  },
};
module.exports = Points;
