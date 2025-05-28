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
      // Un articulo pertenece a un usuario
      Article.belongsTo(models.User, {
        foreignKey: 'userId',             // Clave foránea en el modelo
        as: 'User'
      });   
      
      // Un usuario tiene muchos articulos
      models.User.hasMany(Article, {
        foreignKey: 'userId',             // Clave foránea en el modelo
      });    

      // Un articulo puede pertenecer a muchas categorias y una categoria puede tener muchos articulos
      Article.belongsToMany(models.Category, {
        through: 'articleCategories',  // NOMBRE exacto de la Tabla intermedia
        as: 'categories',              // Nombre del alias para la relación
        foreignKey: 'articleid', // 👈 minúsculas y snake_case
        otherKey: 'categoryid'    // 👈 minúsculas y snake_case
      });
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: { 
      type: DataTypes.INTEGER,
      field: 'userId' // 👈 Nombre EXACTO de la columna en la BD 
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};