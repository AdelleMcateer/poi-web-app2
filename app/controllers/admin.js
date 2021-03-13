"use strict";

const User = require("../models/user");
const Boom = require("@hapi/boom");
const Point = require("../models/poi");
const Joi = require("@hapi/joi");
const Utils = require("../utils/isAdmin");

const Admin = {
  adminHome: {
    auth: { scope: "admin" },
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        const users = await User.find({ scope: "user" }).lean().sort("lastName");
        const scope = user.scope;
        const isadmin = Utils.isAdmin(scope);

        return h.view("admin-home", {
          title: "Admin Home - View Users",
          users: users,
          isadmin: isadmin,
        });
      } catch (e) {
        return h.view("main", { errors: [{ message: e.message }] });
      }
    },
  },

  deleteUser: {
    auth: { scope: ["admin"] },
    handler: async function (request, h) {
      try {
        const id = request.params.id;
        console.log(userId);
        await User.remove({ _id: request.params.id });
        const users = await User.find();
        await User.findByIdAndDelete(id);
        return h.view("admin-home", {
          title: "Admin Home - View Users",
          users: users,
        });
      } catch (err) {
        return h.view("admin-home", { errors: [{ message: e.message }] });
      }
    },
  },
};

module.exports = Admin;
