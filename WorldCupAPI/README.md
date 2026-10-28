# WorldCupAPI — Copa do Mundo 2022

API auxiliar em TypeScript com dados da **Copa do Mundo de 2022**, utilizada como fonte local de jogos para o projeto de bolão.

O conjunto inclui as 32 seleções da competição, grupos, estádios e partidas das diferentes fases do torneio.

## Como rodar

```bash
npm install
npm run dev
```

Por padrão ela utiliza a porta `3333`.

A API principal consulta:

```text
http://localhost:3333/games
```

Se essa API auxiliar não estiver disponível, o projeto principal utiliza uma lista interna de reserva.
