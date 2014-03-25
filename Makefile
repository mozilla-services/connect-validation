# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

NODE_LOCAL_BIN=./node_modules/.bin

.PHONY: test
test: lint mocha

install:
	@npm install

.PHONY: lint
lint: jshint

clean:
	rm -rf node_modules

.PHONY: jshint
jshint:
	@$(NODE_LOCAL_BIN)/jshint test.js

.PHONY: mocha
mocha:
	@$(NODE_LOCAL_BIN)/mocha test.js --reporter spec

.PHONY: demo
demo:
	node demo.js
