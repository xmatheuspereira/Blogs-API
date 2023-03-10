'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,    
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      published: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('blogs_posts');
  }
};
