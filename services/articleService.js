const db = require('../models');

const getAllArticles = async () => {
    try {
        let Articles = await db.Article.findAll({
            // Con esta opción permitimos mostrar los articulos con la informacion del usuario
            include: {
                model: db.User,
                required: true, // Requerido para que solo muestre los articulos con usuario
                as: "User", // Alias del modelo
                attributes: ['id', 'name', 'email'],
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']  // Excluir campos de fecha de creación y actualización
            },
            include: ["categories"]     // Incluir las categorías que estan relacionadas al artículo
        });
        return Articles;
    } catch (error) {
        return error.message || "Failed to get Articles";
    }
};

const getArticle = async (id) => {
    try {
        let Article = await db.Article.findByPk(id);
        return Article;
    } catch (error) {
        throw {status: 500, message: error.message || "Failed to get Article" };
    }
};
                                                                        // Aqui continuación de la guía 5 | Array quemado de categorías
const createArticle = async (title, content, userId, categories) => {   // Agregamos "categories" como parámetro, traidoo del controller 
    try {
        let newArticle = await db.Article.create({
            title,
            content,
            userId
        });
        if (newArticle && categories) {     // Verificams si hay categorías
            //const categories = [1,2,4];    // Ejemplo de categorías a asociar, categorias existentes array quemado
            await newArticle.setCategories(categories); // Asociar categorías al artículo
        }
        return newArticle;
    } catch (error) {
        return error.message || "Article could not be created";
    }
};

const updateArticle = async (id, title, content, userId) => {
    try {
        let updateArticle = await db.Article.update({
            title, 
            content, 
            userId 
        }, { 
            where: { 
                id,
            } 
        });
        return updateArticle;
    } catch (error) {
        return error.message || "Article could not be updated";
    }
};

const deleteArticle = async (id) => {
    try {
        let deleteArticle = await db.Article.destroy({
            where: {
                id
            }
        });
        return deleteArticle;
    } catch (error) {
        return error.message || "Article could not be deleted";
    }
};

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
};
