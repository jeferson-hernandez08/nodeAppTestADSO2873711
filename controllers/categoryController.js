// Enlazamos nuestro servicio 
const Articleservice = require('../services/categoryService'); // Importamos el servicio de articulos

const getAllCategories = async (req, res) => {
    const allCategories = await Categoryservice.getAllCategories(); // Llamamos al servicio para obtener todos los articulos

    if(allCategories)
        res.status(200).send({ status: "OK", data: allCategories }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: allCategories }); // Enviamos un error si no se encontraron articulos
};

const getCategory = async (req, res) => {
    let id = req.params.categoryId; // Obtenemos el id del articulo desde la url
    try {
        const Category = await Categoryservice.getCategory(id);   // Llamamos al servicio para obtener el articulo por id
        res.status(200).send({ status: "OK", data: Category }); // Enviamos la respuesta al cliente
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: {error: error.message }}); // Enviamos un error si no se encontro el articulo
    }
};

const createCategory = async (req, res) => {
    const { body } = req; // Obtenemos el body de la peticion
    const createCategory = await Categoryservice.createCategory(body.name); // Llamamos al servicio para crear el articulo
    if (createCategory)
        res.status(200).send({ status: "OK", data: createCategory }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: createCategory }); // Enviamos un error si no se pudo crear el articulo 
};

const updateCategory = async (req, res) => {  
    let id = req.params.categoryId; // Obtenemos el id del articulo desde la url
    let { name  } = req.body; 
    const updateCategory = await Categoryservice.updateCategory(id, name); // Llamamos al servicio para actualizar el articulo
    if(updateCategory)
        res.status(200).send({ status: "OK", data: updateCategory }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: updateCategory }); // Enviamos un error si no se pudo actualizar el articulo
};

const deleteCategory = async (req, res) => {
    let id = req.params.categoryId; // Obtenemos el id del articulo desde la url
    const deleteCategory = await Articleservice.deleteCategory(id); // Llamamos al servicio para eliminar el articulo
    if(deleteCategory)
        res.status(200).send({ status: "OK", data: deleteCategory }); // Enviamos la respuesta al cliente
    else 
        res.status(400).send({ status: "FAILED", data: deleteCategory }); // Enviamos un error si no se pudo eliminar el articulo
};

module.exports = {      // QUEDE AQUI ****
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};