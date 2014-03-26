==================
connect-validation
==================

connect-validation is a middleware for connect.js (so you can use it with
express applications) that helps handling `400 BAD REQUEST` errors on JSON
APIs, in a deterministic way.

Specifically, the top-level JSON object in the response will always contain a
key named "status", which maps to a string identifying the cause of the error.
Unexpected errors will have a status string of “error”; errors expected as part
of the protocol flow will have a specific status.

Errors will have three different keys:

- location is the location of the error. It can be “querystring”, “header” ,
  “url” or “body”;
- name is the eventual name of the value that caused problem;
- description is a description of the problem encountered.

For instance, that would be something like::

    {
      "status": "errors",
      "errors": [{"location": "body",
                  "name": "version",
                  "description": "version should be an integer"
                 }]
    } 

Great, how do I install that?
=============================

You have to install the middleware in your express application.

.. code-block:: javascript

    var express = require('express');
    var validationMiddleware = require('connect-validation');

    var app = express();
    var app.use(validationMiddleware);


Once installed, `addError` and `sendError` methods will be available on all
Response objects.


How to use it?
==============

Once installed, you can use these two methods whenever you need to send back
errors to the client.  You can add as many errors as you want by using the
`req.addError(location, name, description)` method.

At the end of the validation, use `sendError()` to build the 400 errors response.

.. code-block:: javascript

    app.get('/', function (req, res) {
      if (!req.query.hasOwnProperty('id')) {
        res.addError("querystring", "id", "missing; id");
        res.sendError();
        return;
      }
    });

If you have only one error, you can use `sendError` directly.

.. code-block:: javascript

    app.get('/', function (req, res) {
      if (!req.query.hasOwnProperty('id')) {
        res.sendError("querystring", "id", "missing; id");
        return;
      }
    });

That's all, folks!
