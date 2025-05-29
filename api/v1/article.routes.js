// Creamos el router para poder usar los verbos HTTP
const {Router} = require('express');
// Incluimos nuestro controlador de usuario
const articleController = require('../../controllers/articleController');
const router = Router();   // Llamamos al método Router de expres

// req => request => En request llegan los datos del body 
// res => response => En response se envian los datos hacia al cliente

router.get('/', articleController.getAllArticles);  // Obtener todos los articulos

router.get('/:articleId', articleController.getArticle);  // Obtener un articulo por id

router.post('/', articleController.createArticle);  // Crear un nuevo articulo

router.put('/:articleId', articleController.updateArticle);  // Actualizar un articulo por id

router.delete('/:articleId', articleController.deleteArticle);  // Eliminar un articulo por id

module.exports = router;  // Exportamos el router para usarlo en el servidor