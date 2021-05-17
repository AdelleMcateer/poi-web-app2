"use strict";

const Accounts = require("./app/controllers/accounts");
const Points = require("./app/controllers/points");
const Gallery = require("./app/controllers/gallery");
const Reviews = require('./app/controllers/review');

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },

  { method: "GET", path: "/settings", config: Accounts.showSettings },
  { method: "POST", path: "/settings", config: Accounts.updateSettings },
  { method: "GET", path: "/deleteaccount", config: Accounts.deleteAccount },

  { method: "GET", path: "/home", config: Points.home },
  { method: "GET", path: "/report", config: Points.report },
  { method: "POST", path: "/point", config: Points.point },

  { method: "GET", path: "/updatepoint/{id}", config: Points.showPoint },
  { method: "POST", path: "/updatePoint/{id}", config: Points.updatePoint },
  { method: "GET", path: "/deletepoint/{id}", config: Points.deletePoint },

  { method: "GET", path: "/gallery", config: Gallery.index },
  { method: "POST", path: "/uploadfile", config: Gallery.uploadFile },
  { method: "GET", path: "/deleteimage/{id}", config: Gallery.deleteImage },

  { method: 'GET', path: "/listreview", config: Reviews.listReview },
  { method: 'POST', path: "/addreview", config: Reviews.addReview },

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
