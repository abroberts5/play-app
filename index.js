const pry = require('pryjs')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const favorites = require('./lib/routes/api/v1/favorites.js');

const test = process.env.NODE_ENV || 'test';
const test_config = require('./knexfile')[test];
const test_database = require('knex')(test_config);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'play_app';
app.use('/api/v1/favorites', favorites)

app.get('/api/v1/favorites/:id', (request, response) => {
  var enteredId = request.params.id
  test_database('favorites').where('id', enteredId).select()
    .then((foundFavorite) => {
      response.status(201).json(foundFavorite);
    })
    .catch((error) => {
      response.status(404).json({ error });
    });
  });

app.delete('/api/v1/favorites/:id', (request, response) => {
  const deletedId = request.params.id
  test_database('favorites').where('id', deletedId).del()
    .then((favorite) => {
      response.status(204).json(favorite);
    })
    .catch((error) => {
      response.status(404).json({ error });
    });
  });

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;

  for (let requiredParameter of ['song_name', 'artist_name', 'rating']) {
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
      var formattedResponse = { pl_id: 0 };
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

app.get('/api/v1/playlists/:playlist_id/favorites', (request, response) => {
  const findPlaylist = request.body;
  test_database.select('playlists.id as pl_id', 'playlists.name as pl_name', 'favorites.*')
    .from('playlists')
    .where('playlists.id', request.params.playlist_id)
    .join('playlist_favorites', 'playlist_favorites.playlist_id', 'playlists.id')
    .join('favorites', 'playlist_favorites.favorite_id', 'favorites.id')
    .then(result => {
      var formattedPlaylist = { pl_id: 0 }; //could call this as a function in later version
      result.map((data) => {
        if (formattedPlaylist.pl_id === 0) {
        formattedPlaylist['pl_id'] = data.pl_id;
        formattedPlaylist['pl_name'] = data.pl_name;
        formattedPlaylist['favorites'] = [{
          id: data.id, song_name: data.song_name,
          artist_name: data.artist_name, genre: data.genre,
          rating: data.rating}]
        } else {
          var nextElement = {
          id: data.id, song_name: data.song_name,
          artist_name: data.artist_name, genre: data.genre,
          rating: data.rating
          };
         formattedPlaylist['favorites'].push(nextElement);
        }
      });
      test_database('playlists')
      .then((foundPlaylist) => {
        response.status(201).json(formattedPlaylist)
      })
      .catch((error) => {
        response.status(404).json({ error });
      });
    });
  });

app.post('/api/v1/playlists/:playlist_id/favorites/:id', (request, response) => {
  const playlistFavorite = request.body;

  test_database('favorites').insert(favorite, 'id')
  .then(playlistFavorite => {
    response.status(201).json({ id: playlistFavorite[0] })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = {
  // test_database: test_database,
  // database: database,
  app: app,
}
