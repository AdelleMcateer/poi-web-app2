"use strict";

const User = require("../models/user");
const Admin = require("../models/admin");
const Boom = require("@hapi/boom");

const admin = {
  home: {
    handler: async function (request, h) {
      try {
        const users = await User.find();
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
        User.findByIdAndRemove(request.params.id, function (err) {
          if (err) {
            console.log("Error: User not deleted");
          } else {
            console.log("Success: User deleted " + request.params.id);
          }
        });
        return h.redirect("/admin-home");
      } catch (e) {
        return h.view("main", { errors: [{ message: e.message }] });
      }
    },
  },
};

module.exports = Admin;
