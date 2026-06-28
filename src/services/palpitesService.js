const axios = require('axios');
const connection = require('../database/connection');

async function buscarDadosExternos(dataJogo) {
  const anoDoJogo = dataJogo.substring(0, 4);

  const requisicaoDolar = axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL', {
    timeout: 8000,
  });

  const requisicaoFeriados = axios.get(`https://brasilapi.com.br/api/feriados/v1/${anoDoJogo}`, {
    timeout: 8000,
  });

  try {
    const [respostaDolar, respostaFeriados] = await Promise.all([
      requisicaoDolar,
      requisicaoFeriados,
    ]);

    const dolarNoDia = respostaDolar.data?.USDBRL?.bid || 'Sem informação disponível';
    const feriados = respostaFeriados.data || [];

    const ehFeriado = feriados.some((feriado) => feriado.date === dataJogo);

    return {
      dolarNoDia,
      diaDeFeriado: ehFeriado ? 'Dia com feriado' : 'Dia comum',
    };
  } catch (error) {
    const feriadosFallback = [
      '2026-01-01',
      '2026-02-16',
      '2026-02-17',
      '2026-04-03',
      '2026-04-21',
      '2026-05-01',
      '2026-06-04',
      '2026-09-07',
      '2026-10-12',
      '2026-11-02',
      '2026-11-15',
      '2026-11-20',
      '2026-12-25',
    ];

    return {
      dolarNoDia: '5.85',
      diaDeFeriado: feriadosFallback.includes(dataJogo) ? 'Dia com feriado' : 'Dia comum',
    };
  }
}

function validarGols(golsA, golsB) {
  if (golsA === undefined || golsB === undefined) {
    const erro = new Error('Informe os gols dos dois times no palpite');
    erro.status = 400;
    throw erro;
  }

  const golsANumero = Number(golsA);
  const golsBNumero = Number(golsB);

  if (!Number.isInteger(golsANumero) || !Number.isInteger(golsBNumero)) {
    const erro = new Error('Use apenas números inteiros nos gols');
    erro.status = 400;
    throw erro;
  }

  if (golsANumero < 0 || golsBNumero < 0) {
    const erro = new Error('A quantidade de gols deve ser zero ou maior');
    erro.status = 400;
    throw erro;
  }

  return {
    golsANumero,
    golsBNumero,
  };
}

function montarNomeDoJogo(dados) {
  if (dados.jogo && dados.jogo.trim() !== '') {
    return dados.jogo.trim();
  }

  if (dados.time_a && dados.time_b) {
    return `${dados.time_a.trim()} x ${dados.time_b.trim()}`;
  }

  const erro = new Error('Envie o nome do jogo ou os dois times participantes');
  erro.status = 400;
  throw erro;
}

function validarData(dataJogo) {
  if (!dataJogo || dataJogo.trim() === '') {
    const erro = new Error('Informe a data da partida usando YYYY-MM-DD');
    erro.status = 400;
    throw erro;
  }

  const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(dataJogo);

  if (!dataValida) {
    const erro = new Error('A data da partida precisa seguir o formato YYYY-MM-DD');
    erro.status = 400;
    throw erro;
  }
}

async function criarPalpite(usuarioId, dados) {
  const jogo = montarNomeDoJogo(dados);
  const { golsANumero, golsBNumero } = validarGols(dados.gols_a, dados.gols_b);
  validarData(dados.data_jogo);

  const { dolarNoDia, diaDeFeriado } = await buscarDadosExternos(dados.data_jogo);

  const [id] = await connection('palpites').insert({
    usuario_id: usuarioId,
    jogo,
    gols_a: golsANumero,
    gols_b: golsBNumero,
    data_jogo: dados.data_jogo,
    dolar_no_dia: dolarNoDia,
    dia_de_feriado: diaDeFeriado,
  });

  const palpiteSalvo = await connection('palpites').where({ id }).first();

  return palpiteSalvo;
}

async function listarMeusPalpites(usuarioId) {
  const palpites = await connection('palpites')
    .where({ usuario_id: usuarioId })
    .orderBy('criado_em', 'desc');

  return palpites;
}

async function atualizarPalpite(id, usuarioId, dados) {
  const { golsANumero, golsBNumero } = validarGols(dados.gols_a, dados.gols_b);

  const palpite = await connection('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Não localizei esse palpite');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Esse palpite pertence a outro usuário e não pode ser editado por você');
    erro.status = 403;
    throw erro;
  }

  await connection('palpites').where({ id }).update({
    gols_a: golsANumero,
    gols_b: golsBNumero,
  });

  const palpiteAtualizado = await connection('palpites').where({ id }).first();

  return palpiteAtualizado;
}

async function deletarPalpite(id, usuarioId) {
  const palpite = await connection('palpites').where({ id }).first();

  if (!palpite) {
    const erro = new Error('Não localizei esse palpite');
    erro.status = 404;
    throw erro;
  }

  if (palpite.usuario_id !== usuarioId) {
    const erro = new Error('Esse palpite pertence a outro usuário e não pode ser removido por você');
    erro.status = 403;
    throw erro;
  }

  await connection('palpites').where({ id }).delete();

  return {
    mensagem: 'Palpite removido da sua lista com sucesso',
  };
}

module.exports = {
  criarPalpite,
  listarMeusPalpites,
  atualizarPalpite,
  deletarPalpite,
};
