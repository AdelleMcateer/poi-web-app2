"use strict";

const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const Point = require("../models/poi");
const User = require("../models/user");
const Utils = require("../utils/isAdmin");

const Admin = {
  adminHome: {
    auth: { scope: "admin" },
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        const allUsers = await User.find({ scope: "user" }).lean().sort("lastName");
        const scope = user.scope;
        const isadmin = Utils.isAdmin(scope);

        return h.view("admin-home", {
          title: "Admin Home - View Users",
          users: allUsers,
          isadmin: isadmin,
        });
      } catch (err) {
        return h.view("login", { errors: [{ message: e.message }] });
      }
    },
  },

  deleteUser: {
    auth: { scope: ["admin"] },
    handler: async function (request, h) {
      try {
        const id = request.params.id;
        const user = await User.findById(id).lean();
        const poi = await Point.find({ user: user });

        await User.findByIdAndDelete(id);
        return h.view("/admin-home");
      } catch (err) {
        return h.view("admin-home", { errors: [{ message: e.message }] });
      }
    },
  },
  viewUser: {
    auth: { scope: "admin" },
    handler: async function (request, h) {
      try {
        const id = request.params.id;
        const user = await User.findById(id);
        return h.view("list-users", {
          title: "View User",
          userid: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          isadmin: true,
        });
      } catch (err) {
        return h.view("admin-home", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Admin;
