const db = require('../models');

const getAllCategories = async () => {
    try {
        let Category = await db.Category.findAll({
            // Con esta opción permitimos mostrar la categoria con la informacion del articulo
            include: {
                model: db.Article,
                required: false, // Requerido para que solo muestre los articulos con usuario | false: Permite mostrar categorías sin artículos (usar LEFT JOIN):
                as: "articles", // Alias del modelo
                attributes: ['id', 'title'],
            },
        });
        return Category;
    } catch (error) {
        return error.message || "Failed to get Category";
    }
};

const getCategory = async (id) => {
    try {
        let Category = await db.Category.findByPk(id);
        return Category;
    } catch (error) {
        throw {status: 500, message: error.message || "Failed to get Category" };
    }
};

const createCategory = async (name) => {
    try {
        let newCategory = await db.Category.create({
            name
        });
        return newCategory;
    } catch (error) {
        return error.message || "Category could not be created";
    }
};

const updateCategory = async (id, name) => {
    try {
        let updateCategory = await db.Category.update({
            name
        }, { 
            where: { 
                id,
            } 
        });
        return updateCategory;
    } catch (error) {
        return error.message || "Category could not be updated";
    }
};

const deleteCategory = async (id) => {
    try {
        let deleteCategory = await db.Category.destroy({
            where: {
                id
            }
        });
        return deleteCategory;
    } catch (error) {
        return error.message || "Category could not be deleted";
    }
};

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
