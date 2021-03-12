"use strict";
/*Util to determine if a user is an admin or not*/

const isAdmin = {
  isAdmin(scope) {
    if (scope == "admin") {
      return true;
    }
    return false;
  },
};

module.exports = isAdmin;
