require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Aplicação do bolão disponível em http://localhost:${PORT}`);
  console.log('Endpoints para testar no Postman:');
  console.log('POST   /api/login');
  console.log('GET    /api/jogos');
  console.log('POST   /api/palpites');
  console.log('GET    /api/palpites');
  console.log('PUT    /api/palpites/:id');
  console.log('DELETE /api/palpites/:id');
});
