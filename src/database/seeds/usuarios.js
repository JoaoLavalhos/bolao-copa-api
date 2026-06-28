const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('palpites').del();
  await knex('usuarios').del();

  const senhaBruno = await bcrypt.hash('Copa2026@', 10);
  const senhaLarissa = await bcrypt.hash('Gol2026@', 10);

  await knex('usuarios').insert([
    {
      nome: 'Bruno Ribeiro',
      email: 'bruno.teste@email.com',
      senha: senhaBruno,
    },
    {
      nome: 'Larissa Gomes',
      email: 'larissa.teste@email.com',
      senha: senhaLarissa,
    },
  ]);
};
