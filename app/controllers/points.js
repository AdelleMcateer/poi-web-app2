"use strict";

const Points = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add an point of interest" });
    },
  },
  report: {
    handler: function (request, h) {
      return h.view("report", {
        title: "Points of interest so far",
        point: this.point,
      });
    },
  },
  point: {
    handler: function (request, h) {
      let data = request.payload;
      data.contributor = this.currentUser;
      this.point.push(data);
      return h.redirect("/report");
    },
  },
};
module.exports = Points;
