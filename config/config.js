/**
 * Config
 */
var path = require('path'),
    _ = require('lodash');

var env = process.env.NODE_ENV || 'development',
    rootPath = path.normalize(__dirname + '/..');

// config
var config = {
  root: rootPath,
  app: {
    name: 'express-template',
    version: '0.0.1'
  },
  prot: 5000,
  static_url: '',
  db: 'mongodb://localhost/demo'
};

// environments
var environments = {
  development: {
    db: 'mongodb://localhost/demo_development'
  },

  test: {
    db: 'mongodb://localhost/demo_test'
  },

  production: {
    db: 'mongodb://localhost/demo_production'
  }
};

module.exports = _.has(environments, env) ? _.extend(config, environments[env]) : config;
