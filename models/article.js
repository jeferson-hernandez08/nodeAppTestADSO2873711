'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'userId', // Clave foránea en el modelo
        as: 'User'
      });
      
      models.User.hasMany(Article, {
        foreignKey: 'userId'
      });
      
      Article.belongsToMany(models.Category, {
        through: 'articleCategories', // Nombre EXACTO de la tabla intermedia
        as: 'categories',
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { 
      type: DataTypes.INTEGER,
      field: 'userId' // 👈 Nombre EXACTO de la columna en la BD (minúsculas)
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles', // 👈 Nombre EXACTO de la tabla 
    underscored: false
  });
  return Article;
};