// Update with your config settings.

module.exports = {
  production: {
    client: 'postgresql',
    connection: 'postgres://piwipkjrpwuppz:907ed7363c245ad91b95850fec161cad6977d114c4351a299b911a559bd660c9@ec2-23-23-173-30.compute-1.amazonaws.com:5432/dtgm7h8okrdl3'
  },
  
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
