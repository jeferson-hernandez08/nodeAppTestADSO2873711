'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'userId', // Asegúrate de especificar la foreignKey
        as: 'User'
      });
      
      models.User.hasMany(Article, {
        foreignKey: 'userId'
      });
      
      Article.belongsToMany(models.Category, {
        through: 'articleCategories',
        as: 'categories',
        foreignKey: 'articleId' // Especifica foreignKey explícitamente
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { // Define explícitamente con opciones
      type: DataTypes.INTEGER,
      field: 'UserId' // Fuerza el nombre exacto de la columna en la BD
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles', // Asegúrate que coincide con el nombre real de la tabla
    underscored: false // Desactiva snake_case conversion
  });
  return Article;
};