const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const test_database = require('../index').test_database;
pry = require('pryjs')

chai.use(chaiHttp);

describe('API Routes', () => {
  describe('GET /api/v1/favorites', () => {
    it('should return zero favorites since db is empty', done => {
      chai.request(server)
      .get('/api/v1/favorites')
      .end((err, page) => {
        page.should.have.status(200);
        page.should.be.json;
        page.body.should.be.a('array');
        page.body.length.should.equal(0);
        done();
      });
    });
  });
});
