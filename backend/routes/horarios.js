const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Obtener horarios disponibles para una fecha
router.get('/', async (req, res) => {
    try {
        const { fecha } = req.query;
        if (!fecha) {
            return res.status(400).json({ error: 'La fecha es requerida' });
        }
        const [horarios] = await db.execute(
            `SELECT * FROM horarios 
             WHERE fecha = ? AND disponible = TRUE`,
            [fecha]
        );
        res.json(horarios);
    } catch (error) {
        console.error('Error obteniendo horarios:', error);
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo horario (solo admin)
router.post('/', authMiddleware, checkRole(1), async (req, res) => {
    try {
        const { fecha, hora_inicio, hora_fin } = req.body;
        if (!fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        await db.execute(
            `INSERT INTO horarios (fecha, hora_inicio, hora_fin, disponible, id_user_business) 
             VALUES (?, ?, ?, TRUE, ?)`,
            [fecha, hora_inicio, hora_fin, req.user.id]
        );
        res.status(201).json({ 
            success: true, 
            message: 'Horario creado'
        });
    } catch (error) {
        console.error('Error creando horario:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;