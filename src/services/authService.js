const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

async function login(email, senha) {
  if (!email || !senha) {
    const erro = new Error('Preencha e-mail e senha para entrar');
    erro.status = 400;
    throw erro;
  }

  const usuario = await connection('usuarios').where({ email }).first();

  if (!usuario) {
    const erro = new Error('Dados de acesso não conferem');
    erro.status = 401;
    throw erro;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    const erro = new Error('Dados de acesso não conferem');
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET || 'chave_teste_junto_final',
    { expiresIn: '8h' },
  );

  return {
    mensagem: 'Acesso liberado com sucesso',
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}

module.exports = {
  login,
};
