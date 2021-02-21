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
      const data = request.payload;
      var contributorEmail = request.auth.credentials.id;
      data.contributor = this.users[contributorEmail];
      this.point.push(data);
      return h.redirect("/report");
    },
  },
};
module.exports = Points;
