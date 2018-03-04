'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    * /
      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('User', [{
        name: 'Standard User',
        email: 'standard@email.com',
        password: '$2a$10$1ayYD7ApGzStr.hAmE5QBuZBljOFUaMbGhY1KEoaW1Hztj2FVjzD.',
        role: '0',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: 'Premium User',
        email: 'premium@email.com',
        password: '$2a$10$1ayYD7ApGzStr.hAmE5QBuZBljOFUaMbGhY1KEoaW1Hztj2FVjzD.',
        role: '1',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: 'Admin User',
        email: 'admin@email.com',
        password: '$2a$10$1ayYD7ApGzStr.hAmE5QBuZBljOFUaMbGhY1KEoaW1Hztj2FVjzD.',
        role: '2',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('User', null, {});
  }
};
