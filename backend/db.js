const mysql = require('mysql2/promise'); //Importación de mysql para la conexión a la base de datos

const pool = mysql.createPool({ //Creación de la conexión a la base de datos

    host: 'localhost', //Host de la base de datos
    user: 'root', //Usuario de la base de datos
    password: 'admon', //Contraseña de la base de datos
    database: 'gestor_de_turnos_app', //Nombre de la base de datos
    waitForConnections: true, //Esperar conexiones
    connectionLimit: 10, //Límite de conexiones
    queueLimit: 0, //Límite de cola de conexiones

}); //Configuración de la conexión a la base de datos

module.exports = pool;