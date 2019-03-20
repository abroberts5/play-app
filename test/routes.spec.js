const pry = require('pryjs')
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const test_database = require('../index').test_database;

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET /api/v1/favorites', () => {
    it('should return two favorites', done => {
      chai.request(server)
      .get('/api/v1/favorites')
      .end((err, page) => {
        page.should.have.status(200);
        page.should.be.json;
        page.body.should.be.a('array');
        page.body.length.should.equal(2);
        done();
      });
    });
  });
});
