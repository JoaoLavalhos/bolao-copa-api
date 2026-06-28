const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Envie o token de acesso no cabeçalho Authorization' });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Formato de autorização incorreto. Use Bearer antes do token' });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave_teste_junto_final');

    req.usuarioId = decoded.id;
    req.usuario = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Sessão expirada ou token não reconhecido' });
  }
}

module.exports = authMiddleware;
