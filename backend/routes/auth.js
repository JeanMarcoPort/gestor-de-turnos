const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET_KEY = 'samuelito123';

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, is_business = false } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar en MySQL
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, is_business) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, is_business]
    );

    // Generar JWT
    const token = jwt.sign(
      { id: result.insertId, email, is_business },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, is_business: user.is_business },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Ruta protegida de ejemplo
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.execute('SELECT id, name, email, is_business FROM users WHERE id = ?', [req.user.id]);
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;