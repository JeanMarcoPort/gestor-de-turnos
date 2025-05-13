const jwt = require('jsonwebtoken'); // Importación de jwt para la creación de tokens
const SECRET_KEY = 'samuelito123';

function authMiddleware(req, res, next) //Request para la autenticación, response para la respuesta y next para la siguiente función
{
    const authHeader = req.headers['authorization']; //Cabecera de autorización

    if(!authHeader) return res.status(401).json({ message: 'Token requerido'}) //Si no hay cabecera de autorización
        
    const token = authHeader.split(' ')[1]; //el split divide la cadena en dos partes, el token y el tipo de token, en este caso Bearer. Y el 1 es el token o nodo 1
    if(!token) return res.status(401).json({ message: 'Token inválido'});//Respuesta 401 sin token, no autorizado

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();
    }catch(error){
        return res.status(403).json({ message: 'Token inválido, your mother'});
    }
}

    module.exports = authMiddleware; //Exportación del middleware de autenticación