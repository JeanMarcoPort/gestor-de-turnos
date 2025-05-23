const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Reservar turno
router.post('/', authMiddleware, async (req, res) => {
  console.log('BODY:', req.body);
  console.log('USER:', req.user);
  try {
    const { horario_id, motivo } = req.body;

    // Verificar disponibilidad de horario
    const [horarios] = await db.execute(
      `SELECT disponible FROM horarios WHERE id_horario = ?`,
      [horario_id]
    );

    if (!horarios[0]?.disponible) {
      return res.status(400).json({ message: 'Horario no disponible' });
    }

    // Crear turno 
    await db.execute(
      `INSERT INTO turnos (user_id, horario_id, motivo) VALUES (?, ?, ?)`,
      [req.user.id, horario_id, motivo || 'Consulta']
    );

    // Actualizar disponibilidad del horario
    await db.execute(
      `UPDATE horarios SET disponible = FALSE WHERE id_horario = ?`,
      [horario_id]
    );

    res.status(201).json({ success: true, message: 'Turno reservado' });
  } catch (error) {
    console.error('Error al reservar turno:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancelar turno (eliminar)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const turnoId = req.params.id;
    console.log(`Intentando eliminar turno con id: ${turnoId}`);

    // Primero obtenemos el id del horario asociado al turno
    const [turno] = await db.execute(
      `SELECT horario_id FROM turnos WHERE id = ?`,
      [turnoId]
    );
    console.log('Resultado consulta turno:', turno);

    if (turno.length === 0) {
      console.log('Turno no encontrado');
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    const horarioId = turno[0].horario_id;
    console.log(`Horario asociado: ${horarioId}`);

    // Eliminamos el turno
    await db.execute(`DELETE FROM turnos WHERE id = ?`, [turnoId]);
    console.log('Turno eliminado');

    // Marcamos el horario como disponible nuevamente
    await db.execute(`UPDATE horarios SET disponible = TRUE WHERE id_horario = ?`, [horarioId]);
    console.log('Horario actualizado a disponible');

    res.json({ success: true, message: 'Turno cancelado correctamente' });
  } catch (error) {
    console.error('Error en ruta DELETE turno:', error);
    res.status(500).json({ error: 'Error al cancelar el turno' });
  }
});

// Obtener turnos (todos si es admin, solo propios si es usuario)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = `
      SELECT t.id, t.motivo, t.reservado_en, t.estado,
             h.fecha, h.hora_inicio, h.hora_fin,
             t.user_id, u.name AS user_name
      FROM turnos t
      JOIN horarios h ON t.horario_id = h.id_horario
      JOIN users u ON t.user_id = u.id
    `;
    let params = [];

    // Si el usuario NO es admin, filtra por su id
    if (req.user.rol_id !== 1) {
      query += ' WHERE t.user_id = ?';
      params.push(req.user.id);
    }

    const [turnos] = await db.execute(query, params);
    res.json(turnos);
  } catch (error) {
    console.error('Error obteniendo turnos:', error);
    res.status(500).json({ error: error.message });
  }

  //Cambiar estado de un turno (solo admin)
  router.patch('/:id/estado', authMiddleware, async (req, res) => {
  try {
    const turnoId = req.params.id;
    const { estado } = req.body;
    await db.execute(
      `UPDATE turnos SET estado = ? WHERE id = ?`,
      [estado, turnoId]
    );
    res.json({ success: true, message: 'Estado actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

});

module.exports = router;