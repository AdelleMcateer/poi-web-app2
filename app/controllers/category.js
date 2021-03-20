"use strict";

const CategoryModel = require("../models/category");
const Joi = require("@hapi/joi");
const Point = require("../models/poi");
const User = require("../models/user");

const Category = {
  addCategory: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newCategory = new CategoryModel({
          categoryName: data.name,
        });
        await newCategory.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Category;
