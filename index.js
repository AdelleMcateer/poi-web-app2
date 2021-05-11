"use strict";

const Cookie = require("@hapi/cookie");
const Handlebars = require("handlebars");
const Hapi = require("@hapi/hapi");
const ImageStore = require("./app/utils/image-store");
const Inert = require("@hapi/inert");
const Joi = require("@hapi/joi");
const Vision = require("@hapi/vision");


require("./app/models/db");
const env = require("dotenv");

const dotenv = require("dotenv");

const credentials = {
  cloud_name: process.env.name,
  api_key: process.env.key,
  api_secret: process.env.secret,
};

const server = Hapi.server({
  port: process.env.PORT || 3000,
});

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  server.validator(require("@hapi/joi"));

  //Register disinfect plugin
  await  server.register({
    plugin: require('disinfect'),
    options: {
      disinfectQuery: true,
      disinfectParams: true,
      disinfectPayload: true
    }
  });

  ImageStore.configure(credentials);

  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
  });

  server.auth.default("session");
  server.route(require("./routes"));
  server.route(require('./routes-api'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
