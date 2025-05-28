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
      Article.belongsTo(models.User, {     // Un articulo pertenece a un usuario
        foreignKey: 'userId',             // Clave foránea en el modelo
        as: 'Users'
      });
      
      models.User.hasMany(Article, {     // Un usuario tiene muchos articulos
        foreignKey: 'userId'
      });
      
      // Un articulo puede pertenecer a muchas categorias y una categoria puede tener muchos articulos
      Article.belongsToMany(models.Category, {
        through: 'articleCategories',   // Nombre EXACTO de la tabla intermedia
        as: 'Categories',
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