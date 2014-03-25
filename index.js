/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

/**
* errors middleware add two functions to the response to handle validation.
*
*  - res.addError    to add a new validation error to the response
*  - res.sendError   to add a new validation error and to return the 
*                    `400 BAD REQUEST` JSON response.
*
*/
function errorsMiddleware(req, res, next) {
  var errors = [];
  res.addError = function(location, name, description) {
    errors.push({
      location: location,
      name: name,
      description: description
    });
  };
  res.sendError = function(location, name, description) {
    if (typeof location !== "undefined") {
      res.addError(location, name, description);
    }
    res.json(400, {status: "errors",
                   errors: errors});
  };
  next();
}


module.exports = errorsMiddleware;
