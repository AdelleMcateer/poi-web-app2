"use strict";

const Donations = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Islands of Ireland" });
    },
  },
  signup: {
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up to add points of interest" });
    },
  },
  login: {
    handler: function (request, h) {
      return h.view("login", { title: "Login to view your account and activity" });
    },
  },
};

module.exports = Donations;
