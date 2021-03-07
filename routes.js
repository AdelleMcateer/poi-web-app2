"use strict";

const Accounts = require("./app/controllers/accounts");
const Points = require("./app/controllers/points");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },

  { method: "GET", path: "/settings", config: Accounts.showSettings },
  { method: "POST", path: "/settings", config: Accounts.updateSettings },

  { method: "GET", path: "/home", config: Points.home },
  { method: "GET", path: "/report", config: Points.report },
  { method: "POST", path: "/point", config: Points.point },

  { method: "GET", path: "/updatepoint/{id}", config: Points.showPoint },
  { method: "POST", path: "/updatePoint/{id}", config: Points.updatePoint },
  { method: "GET", path: "/deletepoint/{id}", config: Points.deletePoint },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
