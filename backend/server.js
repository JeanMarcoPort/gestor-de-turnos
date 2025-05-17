const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const turnosRoutes = require('./routes/turnos'); // Importar rutas de turnos
const horariosRoutes = require('./routes/horarios'); // Importar rutas de horarios

const app = express();
const port = 3000;

// Middlewares básicos (se ejecutan en orden)
app.use(morgan('dev')); // dev para mostrar logs en consola de las peticiones
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes); // /auth/login y /auth/register NO requieren token

// Ruta de prueba pública
app.get('/', (req, res) => {
  res.send('API Negocio - Servidor en funcionamiento');
});

// --- Rutas protegidas ---
app.use('api/turnos', turnosRoutes); // /api/turnos requiere token
app.use('api/horarios', horariosRoutes); // /api/horarios requiere token

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});