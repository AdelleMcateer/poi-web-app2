"use strict";
const Category = require("../models/category");
const User = require("../models/user");

const Category = {
  home: {
    handler: async function (request, h) {
      return h.view("home", { title: "Make a Donation", candidates: candidates });
    },
  },
};

module.exports = Categories;
