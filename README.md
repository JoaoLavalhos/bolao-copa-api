# Bolão Copa 2026 API

Projeto acadêmico de backend desenvolvido para uma aplicação de bolão da Copa de 2026.

A API foi construída em Node.js com Express e organizada em camadas, incluindo autenticação, rotas, controllers, services, acesso a banco de dados e uma API auxiliar de partidas para os testes da aplicação.

## Tecnologias

- Node.js
- Express
- SQLite
- Knex
- JWT
- bcrypt
- Axios
- Helmet
- Postman

## Recursos

- cadastro e autenticação de usuários;
- autenticação com JWT;
- consulta de jogos;
- criação e gerenciamento de palpites;
- persistência com SQLite/Knex;
- organização em controllers, services, routes e middlewares;
- coleção do Postman para testes;
- API auxiliar local de jogos em `WorldCupAPI/`.

## Estrutura principal

```text
src/
├── controllers/
├── database/
├── middlewares/
├── routes/
├── services/
├── app.js
└── server.js
```

A pasta `WorldCupAPI/` contém uma API auxiliar utilizada nos testes. Se ela não estiver disponível, a API principal possui partidas internas de reserva.

## Como executar

```bash
npm install
npm run migrate
npm run seed
npm run dev
```

Consulte também o README dentro de `WorldCupAPI/` para executar a API auxiliar.

## Contexto

Projeto desenvolvido como atividade acadêmica de backend, com foco em APIs REST, autenticação, persistência de dados e organização de uma aplicação Node.js.
