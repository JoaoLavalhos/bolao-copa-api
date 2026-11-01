const express = require('express');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const jogosRoutes = require('./routes/jogosRoutes');
const palpitesRoutes = require('./routes/palpitesRoutes');

const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    mensagem: 'Servidor do bolão 2026 ativo e pronto para testes!',
    rotas: [
      'POST /api/login',
      'GET /api/jogos',
      'POST /api/palpites',
      'GET /api/palpites',
      'PUT /api/palpites/:id',
      'DELETE /api/palpites/:id',
    ],
  });
});

app.use('/api', authRoutes);
app.use('/api', jogosRoutes);
app.use('/api', palpitesRoutes);

app.use((req, res) => {
  return res.status(404).json({ mensagem: 'Rota solicitada não existe nesta API' });
});

module.exports = app;
