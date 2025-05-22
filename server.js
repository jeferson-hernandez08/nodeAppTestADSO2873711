//____ 1. server.js - Configuración básica de un servidor con Express

// const express = require('express');       // Para requerir el frameWork express de Node.js.
// const app = express();                    // Se Inicia una instancia de la aplicación Express

// // Iniciar el servidor y escuchar conexiones en el puerto especificado
// app.listen(4000, () => {
//     // Mensaje de confirmación cuando el servidor está en funcionamiento
//     console.log(`Servidor corriendo en el puerto 4000`);
//     console.log(`Accede: http://localhost:4000`);
// });


//____ 2. server.js - Configuración de servidor con almacenamiento de puerto en settings

// const express = require('express');    // Importar el módulo Express
// const app = express();                 // Crear una instancia de la aplicación Express

// // Configurar el puerto como variable de la aplicación (mejor práctica)
// app.set('port', 4000); // 1. Almacena la configuración en el sistema de la app

// // Iniciar el servidor usando la configuración almacenada
// app.listen(app.get('port'), () => {
//     // 2. Usando backticks (`) para template strings
//     console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
//     console.log(`URL de acceso: http://localhost:${app.get('port')}`);
// });


//____ 3. server.js - Servidor Express con rutas API y configuración de entorno

const express = require('express');            // Importar el módulo Express
const app = express();                         // Crear una instancia de la aplicación Express
const bodyParser = require('body-parser');     // Importar body-parser para manejar datos JSON
const morgan = require('morgan');              // Middleware que informa sobre las peticiones del servidoor

if (process.env.NODE_ENV !== 'production') {
    // Cargamos las variables de entorno
    require('dotenv').config();                // Cargar variables de entorno desde el archivo .env
}

// Configurar el puerto (usa variable de entorno o 4080 por defecto)
app.set('port', process.env.PORT || 4000);          // Buenas prácticas para despliegues en la nube

// Middleware para registrar las peticiones HTTP
app.use(bodyParser.urlencoded({ extended: false })); // Middleware para recibir datos desde un formulario
app.use(bodyParser.json());                          // Para que el servidor pueda recibir formato Json
app.use(morgan('dev'));                            // La opcion dev de la informacion principal. 
//app.use(morgan('combined'));                       // La opcion combined de la informacion principal.
//app.use(morgan('short'));                          // La opcion short de la informacion principal.
//app.use(morgan('tiny'));                             // La opcion tiny de la informacion principal.
//app.use(morgan('common'));                           // La opcion common de la informacion principal.

// Routes del api
app.use('/api/v1/users', require('./api/v1/user.routes'));    // Ruta para users
app.use('/api/v1/articles', require('./api/v1/article.routes')); // Ruta para articles
app.use('/api/v1/categories', require('./api/v1/category.routes')); // Ruta para categories

// Rutas del API
// Se configura una ruta sencilla a traves del metodo GET para probar 
// app.get('/', (req, resp) => {
//     /* 
//         req = request  => Es la petición del usuario (contiene datos de la solicitud del cliente)
//         res = response => Es la respuesta del servidor al usuario (para enviar respuesta al cliente)
//     */
//     resp.send({
//         status: 200,
//         message: 'Prueba de API exitosa'    // Envio del formato JSON
//     });
// });  

// Ruta de saludos personalizada
// app.get('/saludos', (req, resp) => {
//     /*
//         Endpoint que devuelve un saludo específico
//     */
//     resp.send({
//         status: 200,
//         message: 'Hello ADSO 2873711'
//     });
// });  

// Nueva ruta
// app.post('newUserTest', (req, resp) => {
//     console.log(req.body)
//     const name = req.body.name;
//     const email = req.body.email;
//     const empresa = req.body.empresa;
//     const direccion = req.body.direccion;
//     const telefono = req.body.telefono;
//     console.log(`Nombre: ${name}`);
//     console.log(`Email: ${email}`); 
//     console.log(`Empresa: ${empresa}`);
//     console.log(`Dirección: ${direccion}`);
//     console.log(`Teléfono: ${telefono}`);
// });

// Ruta para users
app.use('/api/users', require('./api/users'));    // Ruta para users

// Iniciar servidar del API y escuchar conexiones en el puerto especificado
app.listen(app.get('port'), () => {
    // Template string con backticks (`) para interpolación
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`);
    console.log(`Acceso disponible en: http://localhost:${app.get('port')}`);
});