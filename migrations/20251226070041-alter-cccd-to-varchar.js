"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("manhdoi", "cccd", {
      type: Sequelize.STRING(12),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("manhdoi", "cccd", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });
  },
};
