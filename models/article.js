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
        through: 'articlecategories', // Nombre EXACTO de la tabla intermedia
        as: 'categories',
        foreignKey: 'articleid' // Clave foránea en la tabla intermedia (en minúsculas)
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { 
      type: DataTypes.INTEGER,
      field: 'userid' // 👈 Nombre EXACTO de la columna en la BD (minúsculas)
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles', // 👈 Nombre EXACTO de la tabla 
    underscored: false
  });
  return Article;
};