"use strict";

const cloudinary = require("cloudinary");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFileSync);
/*const writeFile = util.promisify(fs.writeFile);*/
const ObjectId = require("mongodb").ObjectID;
const Poi = require("../models/poi");
const Image = require("../models/image");

const ImageStore = {
  configure: function () {
    const credentials = {
      cloud_name: process.env.name,
      api_key: process.env.key,
      api_secret: process.env.secret,
    };
    cloudinary.config(credentials);
  },

  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    await writeFile("./public/temp.img", "imagefile");
    const response = await cloudinary.uploader.upload("./public/temp.img");
    return response;
  },

  deleteImage: async function (id) {
    await cloudinary.v2.uploader.destroy(id, {});
  },
};

module.exports = ImageStore;
