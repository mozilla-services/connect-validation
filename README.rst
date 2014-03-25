==================
connect-validation
==================

connect-validation is a simple middleware for express.js and
connect.js that helps handling `400 BAD REQUEST` on JSON APIs.

Setup
=====

You have to use the middleware.

.. code-block:: javascript

    var express = require('express');
    var validationMiddleware = require('connect-validation');

    var app = express();
    var app.use(validationMiddleware);


This will add the `addError` and `sendError` method to the Response object.


How to use it?
==============

You can add as many errors as you want.
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

