const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3000;

// Middlewares básicos (se ejecutan en orden)
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes); // /auth/login y /auth/register NO requieren token

// Ruta de prueba pública
app.get('/', (req, res) => {
  res.send('API Server funcionando');
});

// --- Rutas protegidas (ejemplo) ---
// Aplicamos authMiddleware solo a rutas específicas
app.get('/profile', authMiddleware, async (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});