/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var express = require('express');
var validationMiddleware = require('connect-validation');

var app = express();
app.use(validationMiddleware);

app.get('/', function (req, res) {
  if (!req.query.hasOwnProperty('id')) {
    res.sendError("querystring", "id", "missing: id");
	return;
  }
  res.json(200, "OK");
});

app.listen(5000, "localhost", function () {
  console.log('Server listening on http://localhost:5000');
});
