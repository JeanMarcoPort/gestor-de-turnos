const express = require('express'); // Importación de express para la creación de rutas
const morgan = require('morgan'); // Importación de morgan para el registro de peticiones HTTP
const cors = require('cors'); // Importación de cors para permitir peticiones desde otros dominios
const db = require('./db'); // Importación de la base de datos
const authRoutes = require('./routes/auth'); // Importación de las rutas de autenticación
const authMiddleware = require('./middleware/auth'); // Importación del middleware de autenticación, que funciona como un filtro para las rutas que requieren autenticación

const app = express(); // Creación de la aplicación express
const port = 3000; // Puerto de la aplicación

app.use(morgan('tiny')); //tiny es un formato de registro de peticiones HTTP que muestra la información básica de la petición, como el método, la URL y el tiempo de respuesta
app.use(cors()); // Uso de cors para permitir peticiones desde otros dominios
app.use(express.json()); // Uso de express.json() para parsear el body de las peticiones a formato JSON
app.use(authRoutes)

app.use(cors()); // Uso de cors para permitir peticiones desde otros dominios
app.use(express.json()); // Uso de express.json() para parsear el body de las peticiones a formato JSON
app.use(authRoutes); // Uso de las rutas de autenticación

// Definimos los endpoints públicos
app.get('/', (req, res) => { // Ruta para la página de inicio
    res.send('API Servidor de Prueba'); // Respuesta con mensaje de éxito
}); // Respuesta con mensaje de éxito

app.listen(port, ()=>{
    console.log('Servidor escuchando correctamente en http://localhost:', port); // Mensaje de éxito al iniciar el servidor. El puerto es el mismo que el de la aplicación
});