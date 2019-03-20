// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/play_app',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
    },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/play_app_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
    }
  };
