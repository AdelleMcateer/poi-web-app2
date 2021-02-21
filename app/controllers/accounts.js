"use strict";

const Accounts = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Islands of Ireland" });
    },
  },
  showSignup: {
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up to add points of Interest" });
    },
  },
  signup: {
    handler: function (request, h) {
      return h.redirect("/home");
    },
  },
  showLogin: {
    handler: function (request, h) {
      return h.view("login", { title: "Login to Islands of Ireland" });
    },
  },
  login: {
    handler: function (request, h) {
      return h.redirect("/home");
    },
  },
  logout: {
    handler: function (request, h) {
      return h.redirect("/");
    },
  },
};

module.exports = Accounts;
