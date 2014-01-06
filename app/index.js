/**
 * Module dependencies
 */
var express = require('express'),
    config = require('../config/config');

var app = express();

require('../config/mongoose')(config);
require('../config/express')(app, config);
require('../config/routes')(app);

app.prot = config.prot;
exports = module.exports = app;
