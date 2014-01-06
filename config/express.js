/**
 * Express
 */
var express = require('express');

module.exports = function (app, config) {
  app.use(express.compress());
  app.engine('html', require('hogan-express'));

  app.locals(config);

  app.set('port', config.port);
  app.set('view engine', 'html');
  app.set('layout', 'layout');

  // development
  if ('development' === app.get('env')) {
    app.set('views', config.root + '/views');

    app.use(express.logger('dev'));
    app.use(express.static(config.root + '/.tmp/public'));
    app.use(express.static(config.root + '/public'));
  }

  // test
  if ('test' === app.get('env')) {
    app.set('views', config.root + '/views');
  }

  // production
  if ('production' === app.get('env')) {
    app.set('views', config.root + '/dist/views');

    app.enable('view cache');
    app.use(express.static(config.root + '/dist/public'));
  }

  app.use(express.favicon(config.root + '/public/favicon.ico'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  app.use(app.router);
  app.use(function (req, res) {
    res.status(404).render('404', {
      title: '404'
    });
  });
};
