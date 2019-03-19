
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('playlists', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('favorites', function(table){
      table.increments('id').primary();
      table.string('song_name');
      table.string('artist_name');
      table.string('genre');
      table.integer('rating');

      table.timestamps(true, true);
    }),
    
    knex.schema.createTable('playlist_favorites', function(table){
      table.increments('id').primary();
      table.integer('playlist_id').unsigned()
      table.foreign('playlist_id').references('playlists.id');

      table.integer('favorite_id').unsigned()
      table.foreign('favorite_id').references('favorites.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('playlist_favorites'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('playlists')
  ]);
}
