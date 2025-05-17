const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
//Importar el middleware de autenticación
// const authMiddleware = require('../middleware/auth');

const SECRET_KEY = 'samuelito123';

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rol_id = 2 } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar en MySQL
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, rol_id) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, rol_id]
    );


    // Generar JWT
    const token = jwt.sign(
      { id: result.insertId, email, rol_id }, // Incluimos rol_id en el token
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(201).json({ token }); //201 = Created
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') { // Error de duplicado
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la almacenada
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, rol_id: user.rol_id },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;