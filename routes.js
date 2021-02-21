const Points = require("./app/controllers/points");

//module.exports = [{ method: "GET", path: "/", config: Points.index }];

module.exports = [
  { method: "GET", path: "/", config: Points.index },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
  },
];
