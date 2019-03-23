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

  describe('GET /api/v1/playlists', () => {
    it('should return two playlists', done => {
      chai.request(server)
      .get('/api/v1/playlists')
      .end((err, page) => {
        page.should.have.status(200);
        page.should.be.json;
        page.body.length.should.equal(2);
        page.body.should.be.a('array');
        page.body[0].should.have.property('pl_id');
        page.body[0].should.have.property('pl_name');
        page.body[0].pl_name.should.equal('Cool Playlist');
        page.body[0].should.have.property('favorites');
        page.body[0]['favorites'].length.should.equal(2);
        page.body[0]['favorites'][0].should.have.property('id');
        page.body[0]['favorites'][0].should.have.property('song_name');
        page.body[0]['favorites'][0].song_name.should.equal('Really Cool Song');
        page.body[0]['favorites'][0].should.have.property('artist_name');
        page.body[0]['favorites'][0].artist_name.should.equal('Josh');
        page.body[0]['favorites'][0].should.have.property('genre');
        page.body[0]['favorites'][0].genre.should.equal('Rock');
        page.body[0]['favorites'][0].should.have.property('rating');
        page.body[0]['favorites'][0].rating.should.equal(77);
        done();
      });
    });
  });
});
