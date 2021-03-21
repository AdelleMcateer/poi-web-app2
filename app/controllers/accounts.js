"use strict";

const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
//const Utils = require("../utils/isAdmin");
const Admin = require("../models/admin");
const User = require("../models/user");
const Poi = require("../models/poi");

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Islands of Ireland" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up to add points of Interest" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
          scope: ["user"],
        });
        user = await newUser.save();
        request.cookieAuth.set({
          id: user.id,
          scope: user.scope,
        });
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login", { title: "Login to Islands of Ireland" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "Login error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        let admin = await Admin.findByEmail(email);
        if (!user && !admin) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        if (user) {
          user.comparePassword(password);
          request.cookieAuth.set({
            id: user.id,
            //scope: user.scope,
          });
          return h.redirect("/home");
        } else if (admin) {
          admin.comparePassword(password);
          request.cookieAuth.set({ id: admin.id });
          const points = await Poi.find().populate("addedBy");
          const users = await User.find();

          return h.view("admin-home");
        }
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  deleteAccount: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        await user.remove();
        return h.redirect("/login");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  showSettings: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        const admin = await Admin.findById(id).lean();
        //const scope = user.scope;
        // const isadmin = Utils.isAdmin(scope);

        return h.view("settings", { title: "Islands of Ireland Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("settings", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = userEdit.password;
        await user.save();
        return h.redirect("/settings");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Accounts;
