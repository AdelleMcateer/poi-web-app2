"use strict";

const Points = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add an point of interest" });
    },
  },
  report: {
    handler: function (request, h) {
      return h.view("report", { title: "Points of interest so far" });
    },
  },
};

module.exports = Points;
