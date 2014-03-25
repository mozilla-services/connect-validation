/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";
var express = require('express');
var errors = require('./index');
var expect = require("chai").expect;
var supertest = require("supertest");

var app = express();
app.use(errors);

describe("errors middlewares", function() {
  var withSendError, withAddErrors;

  // Create a route with the attachSession middleware.
  app.post('/with-send-error', function(req, res) {
    res.sendError("url", "token", "invalid token");
  });

  app.post('/with-add-errors', function(req, res) {
      res.addError("url", "token", "invalid token");
      res.addError("querystring", "version", "missing: version");
      res.addError("body", "callerId", "missing: callerId");
      res.sendError();
    });

  beforeEach(function() {
    withSendError = supertest(app).post("/with-send-error");
    withAddErrors = supertest(app).post("/with-add-errors");
  });

  describe("#sendError", function() {
    it("should return a 400 error with one message", function(done) {
      withSendError
        .expect(400)
        .end(function(err, res) {
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.have.length(1);          
          expect(res.body).eql({
            status: "errors",
            errors: [{location: "url",
                      name: "token",
                      description: "invalid token"}]
          });
          done();
        });
    });
  });

  describe("#addError", function() {
    it("should return a 400 error with three messages", function(done) {
      withAddErrors
        .expect(400)
        .end(function(err, res) {
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.have.length(3);
          expect(res.body).eql({
            status: "errors",
            errors: [{location: "url",
                      name: "token",
                      description: "invalid token"},
                     {location: "querystring",
                      name: "version",
                      description: "missing: version"},
                     {location: "body",
                      name: "callerId",
                      description: "missing: callerId"}]
          });
          done();
        });
    });
  });
});
