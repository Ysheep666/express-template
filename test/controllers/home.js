require('should');

var request = require('supertest');

var app = require('../../app');

describe('GET Home', function() {
  it('should respond OK', function(done) {
    request(app).get('/').end(function(err, res){
      res.status.should.equal(200);
      done(err);
    });
  });
});