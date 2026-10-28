# Bolão da Copa — API

Projeto acadêmico de backend para uma aplicação de bolão, com autenticação, consulta de jogos e gerenciamento de palpites.

A API principal foi construída em Node.js com Express e organizada em camadas, incluindo autenticação, rotas, controllers, services e persistência com SQLite/Knex.

O repositório também inclui uma `WorldCupAPI/` auxiliar baseada nos jogos e seleções da **Copa do Mundo de 2022**, utilizada como fonte local de partidas durante os testes.

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
- TypeScript na API auxiliar

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

A pasta `WorldCupAPI/` contém dados da Copa do Mundo de 2022, incluindo seleções, grupos, estádios e partidas da competição. A API principal consulta essa fonte local e possui uma pequena lista interna de reserva caso a API auxiliar não esteja disponível.

## Como executar

```bash
npm install
npm run migrate
npm run seed
npm run dev
```

Consulte também o README dentro de `WorldCupAPI/` para executar a API auxiliar.

## Contexto

Projeto desenvolvido como atividade acadêmica de backend, com foco em APIs REST, autenticação, persistência de dados, integração entre serviços e organização de uma aplicação Node.js.
