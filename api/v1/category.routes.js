// Creamos el router para poder usar los verbos HTTP
const {Router} = require('express');

// Incluimos nuestro controlador de usuario
const categoryController = require('../../controllers/categoryController');
const router = Router();   // Llamamos al método Router de expres

// req => request => En request llegan los datos del body 
// res => response => En response se envian los datos hacia al cliente

router.get('/', categoryController.getAllCategory);  // Obtener todas las categorias

router.get('/:categotyId', categoryController.getCategory);  // Obtener una categoria por id

router.post('/', categoryController.createCategory);  // Crear una nueva categoria

router.put('/:categoryId', categoryController.updateCategory);  // Actualizar una categoria por id

router.delete('/:categoryId', categoryController.deleteCategory);  // Eliminar una categoria por id

module.exports = router;  // Exportamos el router para usarlo en el servidor