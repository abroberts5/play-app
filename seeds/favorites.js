exports.seed = function(knex, Promise) {
  return knex('playlist_favorites').del()
  .then(() => knex('favorites').del())
  .then(() => knex('playlists').del())
  .then(() => {
    return Promise.all([
      knex('favorites').insert([
        {song_name: "Really Cool Song", artist_name: "Josh", genre: "Rock", rating: 77},
        {song_name: "Stupid Song", artist_name: "Mike", genre: "Polka", rating: 88}
      ])
      .then(() => console.log('Favorites Seeding Complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
  .then(() => {
    return Promise.all([
      knex('playlists').insert([
        { name: "Cool Playlist" },
        { name: "Dripping Ceiling" }
      ])
      .then(() => console.log('Playlist Seeding Complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
  .then(() => {
    var playlists
    return Promise.all([
      knex('playlists').select('id')
      .then( playlist_results => playlists = playlist_results)
      .then( () => knex('favorites').select('id'))
      .then(favorites => [
        { playlist_id: playlists[0].id, favorite_id: favorites[0].id  },
        { playlist_id: playlists[0].id, favorite_id: favorites[1].id  },
        { playlist_id: playlists[1].id, favorite_id: favorites[1].id  }
      ])
      .then( data =>
        knex('playlist_favorites').insert(data))
    ])
  })
}
