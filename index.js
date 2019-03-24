const pry = require('pryjs')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const test = process.env.NODE_ENV || 'test';
const test_config = require('./knexfile')[test];
const test_database = require('knex')(test_config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'play_app';

app.get('/api/v1/favorites', (request, response) => {
  test_database('favorites').select()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
  });

app.get('/api/v1/favorites/:id', (request, response) => {
  const id = request.params.id
  test_database('favorites').where('id', id).select()
    .then((favorite) => {
      response.status(201).json(favorite);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
  });

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;

  for (let requiredParameter of ['song_name', 'artist_name', 'genre', 'rating']) {
    if (isNaN(favorite['rating']) || favorite['rating'] > 100 || favorite['rating'] < 1) {
      return response
      .status(400)
      .send({ error: 'Rating must be a number between 1 - 100.' })
    } else if (!favorite[requiredParameter]) {
      return response
      .status(201)
      .send({ error: `Expected format: { song_name: <String>, artist_name: <String>, genre: <String>, rating: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  test_database('favorites').insert(favorite, 'id')
    .then(favorite => {
      response.status(201).json({ id: favorite[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/playlists', (request, response) => {
  const playlist = request.body;
  test_database.select('playlists.id as pl_id', 'playlists.name as pl_name', 'favorites.*')
    .from('playlists')
    .join('playlist_favorites', 'playlist_favorites.playlist_id', 'playlists.id')
    .join('favorites', 'playlist_favorites.favorite_id', 'favorites.id')
    .then(results => {
      var finalCountdown = [];
      var formattedResponse = {pl_id: 0};
      results.map((data) => {
        if (formattedResponse.pl_id === 0) {
        formattedResponse['pl_id'] = data.pl_id;
        formattedResponse['pl_name'] = data.pl_name;
        formattedResponse['favorites'] = [{
          id: data.id, song_name: data.song_name,
          artist_name: data.artist_name, genre: data.genre,
          rating: data.rating
        }];
        finalCountdown.push(formattedResponse);
      } else if (data.pl_id != formattedResponse.pl_id) {
        var newPlaylist = {
        pl_id: data.pl_id,
        pl_name: data.pl_name,
        favorites: [{
          id: data.id, song_name: data.song_name,
          artist_name: data.artist_name, genre: data.genre,
          rating: data.rating}]
        }
        finalCountdown.push(newPlaylist);
      } else {
          var nextElement = {
          id: data.id, song_name: data.song_name,
          artist_name: data.artist_name, genre: data.genre,
          rating: data.rating
        };
        formattedResponse['favorites'].push(nextElement);
      }
    });
    test_database('playlists')
      .then((playlists) => {
        response.status(200).json(finalCountdown)
      })
      .catch((error) => {
        response.status(500).json({error});
      });
    });
  });

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = {
  test_database: test_database,
  database: database,
  app: app
}
