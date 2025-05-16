const jwt = require('jsonwebtoken'); // Importación de jwt para la creación de tokens
const SECRET_KEY = 'samuelito123';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtener el token del encabezado de autorización
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' }); // Si no hay token, devolver error 401
  }

  const token = authHeader.split(' ')[1]; // Obtener el token del encabezado de autorización

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verificar el token con la clave secreta
    req.user = decoded; // Almacenar la información del usuario en la solicitud
    next(); // Continuar con la siguiente función de middleware
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' }); // Si el token es inválido, devolver error 401
  }
} 