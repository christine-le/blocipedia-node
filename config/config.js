const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'blocipedia'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres@localhost/blocipedia',
    database: 'blocipedia',
    dialect: 'postgres'
  },

  test: {
    root: rootPath,
    app: {
      name: 'blocipedia'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres@localhost/blocipedia',
    database: 'blocipedia',
    dialect: 'postgres'
  },

  production: {
    root: rootPath,
    app: {
      name: 'blocipedia'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    database: 'blocipedia',
    dialect: 'postgres'
  }
};

// const config = {
//   development: {
//     root: rootPath,
//     app: {
//       name: 'blocipedia'
//     },
//     // "username": 'postgres',
//     // "password": null,
//     // port: process.env.PORT || 3000,
//     port: 5433,
//     // database: 'blocipedia',
//     // "host": "postgres://localhost:5433",
//     url: 'postgres://postgres@localhost/blocipedia',
//     dialect: 'postgres'
//   },
//   test: {
//     root: rootPath,
//     app: {
//       name: 'blocipedia'
//     },
//     "username": 'postgres',
//     "password": null,
//     // port: process.env.PORT || 3000,
//     port: 5433,
//     "host": "127.0.0.1",
//     database: 'blocipedia',
//     dialect: 'postgres'
//   },
//   production: {
//      root: rootPath,
//     app: {
//       name: 'blocipedia'
//     },
//     "username": 'postgres',
//     "password": null,
//     port: process.env.PORT || 3000,
//     url: process.env.DATABASE_URL,
//     database: 'blocipedia',
//     dialect: 'postgres',
//     use_env_variable: process.env.DATABASE_URL
//   }
// };

module.exports = config[env];
