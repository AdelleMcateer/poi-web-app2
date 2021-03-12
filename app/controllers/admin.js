"use strict";

const User = require("../models/user");
const Boom = require("@hapi/boom");
const Point = require("../models/poi");
const Utils = require("../utils/isAdmin");

const Admin = {
  adminHome: {
    auth: { scope: "admin" },
    handler: async function (request, h) {
      try {
        const user = await User.findById(id).lean();
        const id = request.auth.credentials.id;
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
