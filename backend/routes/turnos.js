const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Reservar turno
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { horario_id, motivo } = req.body;

    // Verificar disponibilidad de horario
    const [horarios] = await db.execute(
      `SELECT disponible FROM horarios WHERE id = ?`,
      [horario_id] // Cambiamos el nombre de la tabla a "horarios"
    );

    if (!horarios[0]?.disponible) {
      return res.status(400).json({ message: 'Horario no disponible' });
    }

    // Crear turno 
    await db.execute(
      `INSERT INTO turnos (id_user_client, id_horario, motivo) VALUES (?, ?, ?)`,
      [req.user.id, horario_id, motivo || 'Consulta'] // Cambiamos el nombre de la tabla a "turnos"
    );

    // Actualizar disponibilidad del horario
    await db.execute(
      `UPDATE horarios SET disponible = FALSE WHERE id = ?`,
      [horario_id] // Cambiamos el nombre de la tabla a "horarios"
    );

    res.status(201).json({ success: true, message: 'Turno reservado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener turnos del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [turnos] = await db.execute( //await.db.execute es para ejecutar una consulta SQL
      `SELECT t.id, t.motivo, t.fecha_reserva, 
                h.fecha, h.hora_inicio, h.hora_fin
         FROM turnos t
            JOIN horarios h ON t.horario_id = h.id
            WHERE t.user_id = ?`,
        [req.user.id] // Cambiamos el nombre de la tabla a "turnos"
    );
    res.json(turnos);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});


module.exports = router;