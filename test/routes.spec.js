const pry = require('pryjs')
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const test_database = require('../lib/models/favorite.js').test_database;

chai.use(chaiHttp);

describe('API Routes', () => {

  before((done) => {
  test_database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  beforeEach((done) => {
  test_database.raw("TRUNCATE playlist_favorites restart identity;")
    .then(() => test_database.raw("TRUNCATE playlists restart identity CASCADE;"))
    .then(() => test_database.raw("TRUNCATE favorites restart identity CASCADE;"))
    .then(() => test_database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      }));
    });

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

  describe('POST /api/v1/favorites', () => {
    it('can post a favorite to database', done => {
      chai.request(server)
      .post('/api/v1/favorites')
      .send({
        song_name: 'Finally Finished Favorite get',
        artist_name: 'NicknAaron',
        genre: 'Death Metal',
        rating: 65
      })
      .end((err, page) => {
        page.should.have.status(201);
        page.body.should.be.a('object');
        page.body.should.have.property('id');
        done();
      });
    });
    it('reports 400 when rating is higher than 100', done => {
      chai.request(server)
      .post('/api/v1/favorites')
      .send({
        song_name: 'Forever My Lady',
        artist_name: 'Terrible Singer',
        genre: 'Smooth Jazz',
        rating: 101
      })
      .end((err, page) => {
        page.should.have.status(400);
        page.body.error.should.equal('Rating must be a number between 1 - 100.')
        done();
      });
    });
  });

  describe('GET /api/v1/favorites/:id', () => {
    it('should return a show page of one favorite', done => {
      chai.request(server)
      .post('/api/v1/favorites')
      .send({
        id: 100,
        song_name: 'Forever My Lady',
        artist_name: 'Terrible Singer',
        genre: 'Smooth Jazz',
        rating: 50
      });
      chai.request(server)
      .get('/api/v1/favorites/100')
      .end((err, page) => {
        page.should.have.status(201);
        page.should.be.json;
        page.body.should.be.a('array');
        done();
      });
    });
  });

  describe('DELETE /api/v1/favorites/:id', () => {
    it('should delete the favorite', done => {
      chai.request(server)
      .post('/api/v1/favorites')
      .send({
        id: 25,
        song_name: 'Cant Wait to get deleted',
        artist_name: 'Mr Delete',
        genre: 'Rap',
        rating: 69
      });
      chai.request(server)
      .delete('/api/v1/favorites/25')
      .end((err, page) => {
        page.should.have.status(204);
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

  describe('GET /api/v1/playlists/:playlist_id/favorites', () => {
    it('should return the one playlist selected', done => {
      chai.request(server)
      .get('/api/v1/playlists/1/favorites')
      .end((err, page) => {
        page.should.have.status(201);
        page.body.pl_id.should.equal(1);
        page.body.favorites.should.be.a('array');
        page.body.favorites[0].should.have.property('id');
        page.body.favorites[0].should.have.property('song_name');
        page.body.favorites[0].should.have.property('artist_name');
        page.body.favorites[0].should.have.property('genre');
        page.body.favorites[0].should.have.property('rating');
        page.body.favorites[0].rating.should.equal(77);
        done();
      });
    });
  });

  describe('POST /api/v1/playlists/:playlist_id/favorites/:id', () => {
    it('can post new favorite with a playlist', done => {
      chai.request(server)
      .post('/api/v1/playlists/2/favorites/1')
      .end((err, page) => {
        page.should.have.status(201);
        page.body.should.equal("successfully added")
        done();
      });
    });
  });

});
