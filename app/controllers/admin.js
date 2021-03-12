"use strict";

const User = require("../models/user");
const Boom = require("@hapi/boom");
const Point = require("../models/poi");

const Admin = {
  adminHome: {
    handler: async function (request, h) {
      try {
        const users = await User.find();
        const id = request.auth.credentials.id;
        return h.view("admin-home", {
          title: "Admin Home",
          users: users,
        });
      } catch (e) {
        return h.view("main", { errors: [{ message: e.message }] });
      }
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      try {
        const userId = request.params.id;
        console.log(userId);
        await User.remove({ _id: request.params.id });
        const users = await User.find();
        return h.view("admin-home", {
          title: "List of Users",
          users: users,
        });
      } catch (err) {
        return h.view("main", { errors: [{ message: e.message }] });
      }
    },
  },
};

module.exports = Admin;
