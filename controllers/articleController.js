// Enlazamos nuestro servicio 
const Articleservice = require('../services/articleService'); // Importamos el servicio de articulos

const getAllArticles = async (req, res) => {
    const allArticles = await Articleservice.getAllArticles(); // Llamamos al servicio para obtener todos los articulos

    if(allArticles)
        res.status(200).send({ status: "OK", data: allArticles }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: allArticles }); // Enviamos un error si no se encontraron articulos
};

const getArticle = async (req, res) => {
    let id = req.params.articleId; // Obtenemos el id del articulo desde la url
    try {
        const Article = await Articleservice.getArticle(id);   // Llamamos al servicio para obtener el articulo por id
        res.status(200).send({ status: "OK", data: Article }); // Enviamos la respuesta al cliente
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: {error: error.message }}); // Enviamos un error si no se encontro el articulo
    }
};

const createArticle = async (req, res) => {
    const { body } = req; // Obtenemos el body de la peticion
    const createArticle = await Articleservice.createArticle(body.title, body.content, body.UserId); // Llamamos al servicio para crear el articulo
    if (createArticle)
        res.status(200).send({ status: "OK", data: createArticle }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: createArticle }); // Enviamos un error si no se pudo crear el articulo 
};

const updateArticle = async (req, res) => {  
    let id = req.params.ArticleId; // Obtenemos el id del articulo desde la url
    let { title, content, UserId  } = req.body; 
    const updateArticle = await Articleservice.updateArticle(id, title, content, UserId); // Llamamos al servicio para actualizar el articulo
    if(updateArticle)
        res.status(200).send({ status: "OK", data: updateArticle }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: updateArticle }); // Enviamos un error si no se pudo actualizar el articulo
};

const deleteArticle = async (req, res) => {
    let id = req.params.ArticleId; // Obtenemos el id del articulo desde la url
    const deleteArticle = await Articleservice.deleteArticle(id); // Llamamos al servicio para eliminar el articulo
    if(deleteArticle)
        res.status(200).send({ status: "OK", data: deleteArticle }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: deleteArticle }); // Enviamos un error si no se pudo eliminar el articulo
};

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
};