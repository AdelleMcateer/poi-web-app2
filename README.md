# poi-web



**Student Name:** Adelle McAteer

**Student Number:** 20091411

**Module:** Enterprise Web Development

**Glitch deployment:** https://level-young-exoplanet.glitch.me/

# Overview

### POI Web Application V2
A NodeJs app that implements the core features of a POI web app.

The app supports the following User Management Features:
- Sign up / Login in / Delete Account
- Simple User Admin Dashboard - not fully implemented yet.

The  application supports the following POI Characteristics:
- Name, Description, Category, Location & Image

The following app features are also incorporated:
- Create, Read, Update & Delete POIs.
- Organise POIs into categories - currently in progress and not fully implemented yet.
- POI Image uplaod through Cloudinary.
- Basic account admin and possible to delete user account.

## API functinality & Tests
- Basic API endpoints exposed
- Basic Unit Tests suite

## Authentication & Security
- JWT
- Password hashing & salting
- Filtering & Santization

## Technologies and Tools
- NodeJs
- axios 
- Boom: logging error messages.
- Bcrypt.
- chai
- Cloudinary - image uplaod and storage.
- Dotenv - to store environment variables for db and Cloudinary.
- Disinfect
- Glitch - backup deployment (this is currently a few steps behind this master commit.)
- Hapi framework 
- Hapi Cookies: Authentication/Cookies
- Hapi inert - handler methods for serving static files and directories with the hapi web framework.
- Hapi Joi -  to ensure validation of key information.
- Hapi vision - Template rendering support for hapi.js.
- Handlebars - logic-less templating engine.
- Hapi-auth-jwt2
- Jsonwebtoken
- Javascript 
- lodash
- mocha
- Mongoose - object modelling for node.js.
- Mongoose seeder - test the application with the same DB.
- MongoDB Atlas - Cloud storage.
- Sanitize-html

