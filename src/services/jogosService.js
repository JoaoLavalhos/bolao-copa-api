const axios = require('axios');

const WORLDCUP_API_URL = process.env.WORLDCUP_API_URL || 'http://localhost:3333/games';

const jogosFallback = [
  {
    id: 1,
    partida: 'Brasil x México',
    time_a: 'Brasil',
    time_b: 'México',
    data: '2026-06-11',
    estadio: 'Estádio Azteca',
    grupo: 'A',
    fase: 'Fase de Grupos',
  },
  {
    id: 2,
    partida: 'Portugal x Coreia do Sul',
    time_a: 'Portugal',
    time_b: 'Coreia do Sul',
    data: '2026-06-13',
    estadio: 'MetLife Stadium',
    grupo: 'B',
    fase: 'Fase de Grupos',
  },
  {
    id: 3,
    partida: 'Alemanha x Uruguai',
    time_a: 'Alemanha',
    time_b: 'Uruguai',
    data: '2026-06-15',
    estadio: 'SoFi Stadium',
    grupo: 'C',
    fase: 'Fase de Grupos',
  },
];

async function listarJogos() {
  try {
    const response = await axios.get(WORLDCUP_API_URL, { timeout: 8000 });

    const partidas = response.data
      .filter((jogo) => jogo.homeTeam && jogo.outsideTeam)
      .map((jogo, index) => {
        const timeA = jogo.homeTeam?.name || 'Seleção sem cadastro';
        const timeB = jogo.outsideTeam?.name || 'Seleção sem cadastro';

        return {
          id: index + 1,
          partida: `${timeA} x ${timeB}`,
          time_a: timeA,
          time_b: timeB,
          data: jogo.date,
          estadio: jogo.stadium,
          grupo: jogo.group || null,
          fase: mapearFase(jogo.step),
          placar: {
            time_a: jogo.homeScore ?? null,
            time_b: jogo.outsideScore ?? null,
          },
        };
      });

    return {
      origem: 'WorldCupAPI',
      total: partidas.length,
      partidas,
    };
  } catch (error) {
    return {
      origem: 'Lista interna usada porque a WorldCupAPI não retornou resposta',
      total: jogosFallback.length,
      partidas: jogosFallback,
    };
  }
}

function mapearFase(step) {
  const fases = {
    1: 'Fase de Grupos',
    2: 'Rodada 2 dos Grupos',
    3: 'Rodada 3 dos Grupos',
    4: 'Oitavas de Final',
    5: 'Quartas de Final',
    6: 'Semifinal',
    7: 'Disputa de 3º lugar',
    8: 'Final',
  };

  return fases[String(step)] || 'Etapa não identificada';
}

module.exports = {
  listarJogos,
};
