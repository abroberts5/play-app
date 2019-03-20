exports.seed = function(knex, Promise) {
  return knex('favorites').del()
  .then(() => {
    return Promise.all([
      knex('favorites').insert([
        {song_name: "Really Cool Song", artist_name: "Josh", genre: "Rock", rating: 77},
        {song_name: "Stupid Song", artist_name: "Mike", genre: "Polka", rating: 77}
      ])
      .then(() => console.log('Seeding Complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    ])
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
}
