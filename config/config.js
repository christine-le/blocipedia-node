const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'retry'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres@localhost/blocipedia'
  },

  test: {
    root: rootPath,
    app: {
      name: 'retry'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres@localhost/blocipedia'
  },

  production: {
    root: rootPath,
    app: {
      name: 'retry'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL
  }
};

module.exports = config[env];
