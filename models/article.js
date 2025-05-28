'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User);   // Un articulo pertenece a un usuario
      models.User.hasMany(Article);    // Un usuario tiene muchos articulos
      // Un articulo puede pertenecer a muchas categorias y una categoria puede tener muchos articulos
      Article.belongsToMany(models.Category, {
        through: 'articleCategories',  // Tabla intermedia
        as: 'categories',              // Nombre del alias para la relación
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};