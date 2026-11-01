const jogosService = require('../services/jogosService');

async function listarJogos(req, res) {
  try {
    const jogos = await jogosService.listarJogos();

    return res.json(jogos);
  } catch (error) {
    return res.status(error.status || 500).json({
      mensagem: error.message,
    });
  }
}

module.exports = {
  listarJogos,
};
