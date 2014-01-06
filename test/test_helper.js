require('../app');

var connection = require('mongoose').connection;

before(function (done) {
  connection.on('open', function () {
    connection.db.dropDatabase(done);
  });
});

after(function (done) {
  connection.close(done);
});

afterEach(function (done) {
  connection.db.dropDatabase(done);
});
