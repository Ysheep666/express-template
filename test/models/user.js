require('should');
require('../test_helper');

var mongoose = require('mongoose');

describe('Test user model', function () {
  var User = mongoose.model('User');

  it('#count()', function (done) {

    User.count(function (err, count) {
      if (err) {
        done(err);
      } else {
        count.should.equal(0);
        done();
      }
    });

  });
});