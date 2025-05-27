'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', 
      [
        {
          name: 'Technology',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Health',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lifestyle',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Education',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
