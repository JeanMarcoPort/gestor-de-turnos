const jwt = require('jsonwebtoken');
const SECRET_KEY = 'samuelito123';

// Middleware para verificar el rol del usuario
// Este middleware verifica si el usuario tiene el rol requerido
module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.rol_id !== requiredRole) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    next();
    };
};