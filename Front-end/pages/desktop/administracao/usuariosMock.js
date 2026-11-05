const CARGOS = [
  'Professor',
  'Técnico de laboratório',
  'Coordenador',
  'Administrador',
  'Analista',
  'Assistente',
  'Estagiário',
  'Pesquisador',
  'Diretor',
];

const PERFIS = [
  'Administrador',
  'Gestor',
  'Operador',
  'Visualizador',
  'Auditor',
  'Convidado',
  'Suporte',
];

const fixos = [
  { nome: 'Luis Oliva', email: 'luis@email.com', ativo: true },
  { nome: 'Mariana Costa', email: 'mariana@email.com', ativo: true },
  { nome: 'Carlos Mendes', email: 'carlos@email.com', ativo: false },
  { nome: 'Juliana Alves', email: 'juliana@email.com', ativo: false },
  { nome: 'Rafael Souza', email: 'rafael@email.com', ativo: true },
  { nome: 'Camila Rocha', email: 'camila@email.com', ativo: true },
  { nome: 'Lucas Pereira', email: 'lucas@email.com', ativo: false },
  { nome: 'Fernanda Lima', email: 'fernanda@email.com', ativo: true },
  { nome: 'Bruno Oliveira', email: 'bruno@email.com', ativo: false },
  { nome: 'Beatriz Santos', email: 'beatriz@email.com', ativo: true },
  { nome: 'Gustavo Ribeiro', email: 'gustavo@email.com', ativo: true },
];

const primeiros = ['Ana', 'Pedro', 'Larissa', 'Thiago', 'Patrícia', 'Diego', 'Renata', 'Felipe', 'Aline', 'Marcelo'];
const sobrenomes = ['Martins', 'Barbosa', 'Carvalho', 'Teixeira', 'Moreira', 'Nunes', 'Araújo', 'Ferreira', 'Gomes', 'Cardoso'];

function slug(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '.');
}

const gerados = [];
for (let i = fixos.length; i < 50; i += 1) {
  const nome = `${primeiros[i % primeiros.length]} ${sobrenomes[(i * 7) % sobrenomes.length]}`;
  gerados.push({
    nome,
    email: `${slug(nome)}.${i}@email.com`,
    ativo: i % 3 !== 0,
  });
}

export const usuariosIniciais = [...fixos, ...gerados].map((usuario, index) => ({
  id: index + 1,
  nome: usuario.nome,
  email: usuario.email,
  senha: '123456',
  perfil: PERFIS[index % PERFIS.length],
  cargo: CARGOS[index % CARGOS.length],
  ativo: usuario.ativo,
}));