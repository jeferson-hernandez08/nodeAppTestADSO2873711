const db = require('../models');

const getAllArticles = async () => {
    try {
        let Articles = await db.Article.findAll({
            // Con esta opción permitimos mostrar los articulos con la infirmacion del usuario
            include: {
                model: db.User,
                required: true, // Requerido para que solo muestre los articulos con usuario
                as: "User", // Alias del modelo
                attributes: ['id', 'name', 'email'],
            },
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

const createArticle = async (title, content, UserId) => {
    try {
        let newArticle = await db.Article.create({
            title,
            content,
            UserId
        });
        return newArticle;
    } catch (error) {
        return error.message || "Article could not be created";
    }
};

const updateArticle = async (id, title, content, idUser) => {
    try {
        let updateArticle = await db.Article.update({
            title, 
            content, 
            idUser 
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
