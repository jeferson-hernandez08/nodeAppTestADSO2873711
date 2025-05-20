'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Función que ejecuta la migración y crea la tabla articles
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',   // Nombre de la tabla referenciada
            key: 'id'             // Clave primaria de la tabla referenciada
          }
        },
        onUpdate: 'CASCADE',    // Actualiza el id del usuario en los articulos si se actualiza el id del usuario
        onDelete: 'RESTRICT'   // No se puede eliminar un usuario si tiene articulos
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};