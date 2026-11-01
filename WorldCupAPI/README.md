# WorldCupAPI auxiliar

Esta pasta contém a API local de jogos usada como apoio para os testes da aplicação de bolão.

## Como rodar

```bash
npm install
npm run dev
```

Por padrão ela utiliza a porta `3333`.

A API principal consulta a rota:

```txt
http://localhost:3333/games
```

Se essa API auxiliar não estiver rodando, o projeto principal ainda responde `/api/jogos` usando partidas internas de reserva.
