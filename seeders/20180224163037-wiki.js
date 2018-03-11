'use strict';
const faker = require("faker");
let wikis = [];

for(let i = 1 ; i <= 15 ; i++){
  wikis.push({
    // title: faker.hacker.noun(),
    // body: faker.hacker.phrase(),
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    private: false,
    UserId: Math.floor(Math.random() * (4 - 1 + 1)) + 1,   // pick random user IDs between 1 - 3
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
