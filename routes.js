const Points = require("./app/controllers/points");

module.exports = [
  { method: "GET", path: "/", config: Points.index },
  { method: "GET", path: "/signup", config: Points.signup },
  { method: "GET", path: "/login", config: Points.login },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } } },
];
