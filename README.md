# Bolão da Copa — API

API REST acadêmica para gerenciamento de palpites de partidas de futebol, com autenticação JWT, persistência em SQLite e integração com uma API auxiliar de jogos.

## Tecnologias

- Node.js
- Express.js
- SQLite
- Knex.js
- JWT
- bcrypt
- Axios
- Helmet
- Postman

## Funcionalidades

- autenticação de usuários com JWT;
- listagem de partidas;
- criação de palpites;
- consulta dos palpites do usuário autenticado;
- edição e exclusão de palpites;
- persistência em SQLite;
- integração com serviços externos;
- fallback local quando a API auxiliar de jogos não está disponível.

## Estrutura

```text
src/
├── controllers/
├── database/
│   ├── migrations/
│   └── seeds/
├── middlewares/
├── routes/
├── services/
├── app.js
└── server.js

WorldCupAPI/
postman/
```

A pasta `WorldCupAPI/` contém uma API auxiliar em TypeScript com dados da **Copa do Mundo de 2022**. A API principal consulta esse serviço local para obter partidas. Caso ele não esteja disponível, `src/services/jogosService.js` utiliza uma pequena lista interna de partidas demonstrativas.

## Endpoints principais

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/login` | Autentica o usuário e retorna um token JWT |
| GET | `/api/jogos` | Lista as partidas disponíveis |
| POST | `/api/palpites` | Cria um palpite |
| GET | `/api/palpites` | Lista os palpites do usuário autenticado |
| PUT | `/api/palpites/:id` | Atualiza um palpite |
| DELETE | `/api/palpites/:id` | Remove um palpite |

As rotas de palpites exigem token JWT.

## Como executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
PORT=3000
JWT_SECRET=sua_chave_jwt
WORLDCUP_API_URL=http://localhost:3333/games
```

### 3. Prepare o banco

```bash
npm run migrate
npm run seed
```

### 4. Inicie a API principal

```bash
npm start
```

Por padrão, a aplicação fica disponível em:

```text
http://localhost:3000
```

## API auxiliar de jogos

Para utilizar os dados da `WorldCupAPI`:

```bash
cd WorldCupAPI
npm install
npm run dev
```

Por padrão, ela utiliza a porta `3333`.

## Testes de requisição

A pasta `postman/` contém uma coleção que pode ser importada no Postman para testar as rotas da API.

## Sobre o projeto

Projeto desenvolvido com foco em prática de backend, organização em camadas, autenticação, banco de dados, consumo de APIs e construção de endpoints REST.
