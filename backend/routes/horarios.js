const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Obtener horarios disponibles
router.get('/', async (req, res) => {
    try {
        const { fecha } = req.query;
        const [horarios] = await db.execute(
            `SELECT * FROM horarios 
       WHERE fecha = ? AND disponible = TRUE`,
            [fecha]
        );
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo horario (solo admin)
router.post('/', authMiddleware, checkRole(1), async (req, res) => { //Agregamos el middleware checkRole para verificar el rol
    try {
        const { fecha, hora_inicio, hora_fin } = req.body;

        await db.execute(
            `INSERT INTO horarios (fecha, hora_inicio, hora_fin, disponible, id_user_business) 
       VALUES (?, ?, ?, TRUE, ?)`,
            [fecha, hora_inicio, hora_fin, req.user.id] // Agregamos el id del usuario que crea el horario
        );

        res.status(201).json({ 
            success: true, 
            message: 'Horario creado'
         });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;