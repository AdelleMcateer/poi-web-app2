"use strict";
const Category = require("../models/category");
const Point = require("../models/poi");
const User = require("../models/user");
const Utils = require("../utils/isAdmin");

const Category = {
  addcategory: {
    handler: async function (request, h) {
      try {
        const data = request.payload;
        const newCategory = new Category({
          categoryName: data.category,
        });
        await newCategory.save();
        return h.redirect("/admin-home");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Categories;
