const db = require('../models');          // Importar modelos de la base de datos
const { Router } = require('express');   // Extraer el método Router de Express
// Creamos el router para poder usar los verbos HTTP
const router = Router();                // Crear una instancia de enrutador de Express

// req => request   => En request llegan los datos del body
// res => response  => Se envían  los datos hacia el cliente
router.get('/', (req, res) => {
    // Enviar respuesta JSON al cliente
    res.send({
        Title: 'Hello ADSO !',
    });
});

// Ruta POST
router.post('/new', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    try {
        await db.User.create({
            name,
            email,         
            password
        });
        res.status(200).send('Usuario creado correctamente');
    } catch (error) {
        res.status(400).send('Error al crear el usuario');
    }
});

// Ruta ALL
router.get('/all', async (req, res) => {
    try {
        let users = await db.User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Error al obtener los usuarios');
    }
});

// Ruta Get{id}
router.get('/:id', async (req, res) => {
    try {
        let id   = req.params.id;
        let users = await db.User.findByPk(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Error al obtener el usuario');
    }
});

// Ruta PUT
router.put('/:id', async (req, res) => {
    try {
        let id   = req.params.id;
        let { name, email, password} = req.body;
        await db.User.update(
            { name, email, password }, 
            {
                where: { 
                    id 
                }
            }
        );
        res.status(200).send('Usuario actualizado correctamente');
    } catch (error) {
        res.status(400).send('Error al actualizar el usuario');
    }
});

// Ruta DELETE
router.delete('/:id', async (req, res) => {
    try {
        let id   = req.params.id;
        await db.User.destroy({
            where: { 
                id 
            }
        });
        res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        res.status(400).send('Error al eliminar el usuario');
    }
});

// Exportar el enrutador para su uso en otros archivos
module.exports = router;