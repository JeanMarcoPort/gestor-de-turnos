const jwt = require('jsonwebtoken');
const SECRET_KEY = 'samuelito123';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Bearer token

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica el token
    req.user = decoded;
    next(); // Llama al siguiente middleware o ruta
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({ error: 'Token inválido' });
    }
};