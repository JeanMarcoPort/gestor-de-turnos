const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const bcrypt = require('bcrypt');


// GET todos los usuarios
router.get('/', authMiddleware, checkRole(1), async (req, res) => {
  const [usuarios] = await db.execute('SELECT id, name, email, rol_id FROM users');
  res.json(usuarios);
});

// PATCH cambiar rol
router.patch('/:id/rol', authMiddleware, checkRole(1), async (req, res) => {
  const { rol_id } = req.body;
  await db.execute('UPDATE users SET rol_id = ? WHERE id = ?', [rol_id, req.params.id]);
  res.json({ success: true });
});


// POST crear usuario
// Con bcrypt para encriptar la contraseña
router.post('/', authMiddleware, checkRole(1), async (req, res) => {
  const { name, email, password, rol_id } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await db.execute(
    'INSERT INTO users (name, email, password, rol_id) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, rol_id]
  );
  res.json({ success: true });
});

// PUT editar usuario
router.put('/:id', authMiddleware, checkRole(1), async (req, res) => {
  const { name, email, rol_id } = req.body;
  await db.execute('UPDATE users SET name = ?, email = ?, rol_id = ? WHERE id = ?', [name, email, rol_id, req.params.id]);
  res.json({ success: true });
});

// DELETE eliminar usuario
router.delete('/:id', authMiddleware, checkRole(1), async (req, res) => {
  await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;