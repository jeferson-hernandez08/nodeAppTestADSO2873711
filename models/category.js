'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Article, {
        through: 'articleCategories',  // Tabla intermedia, tal cual como en la base de datos
        as: 'articles',                // Nombre del alias para la relación
        foreignKey: 'categoryId', // 👈 Mandamos a sequielize las variables de nuestra tabla articleCategories
        otherKey: 'articleId'     // 👈 
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};