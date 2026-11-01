# WorldCupAPI — Copa do Mundo 2022

API auxiliar em TypeScript utilizada pelo projeto principal para fornecer dados de partidas da **Copa do Mundo de 2022**.

## Como executar

```bash
npm install
npm run dev
```

Por padrão, a aplicação utiliza a porta `3333`.

A API principal consulta:

```text
http://localhost:3333/games
```

Se esse serviço auxiliar não estiver disponível, a API principal continua respondendo `/api/jogos` utilizando uma lista interna de partidas demonstrativas.
