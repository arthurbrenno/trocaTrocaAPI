import express from 'express';
import { UsuarioController } from '../src/Presentation/UsuarioController';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite solicitações de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Define os métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Define os cabeçalhos permitidos
  next();
});

app.get(
  "/", 
  (req, res) => {
  res.send({
    "Author": "Pablio Richardy",
    "GitHub": "",
    "Descrição": "Bem-vindo ao trocaTroca, o app onde você troca mensagens mais rápido que troca de roupa! Com velocidade supersônica e segurança digna de espião, prepare-se para revolucionar suas conversas com um toque de loucura!"
  });
});

app.get(
  "/api/usuarios",
  async (req, res) => {
    const AUTH_KEY: any = req.headers.authorization;

    const RESPOSTA = await UsuarioController.buscarUsuarios(AUTH_KEY);

    res.send(RESPOSTA);
  }
)
app.post(
  "/api/usuarios",
  async (req, res) => {
    const { apelido, senha, caminhoFoto } = req.body;

    const RESPOSTA = await UsuarioController.criarUsuario(apelido, senha, caminhoFoto);

    res.send(RESPOSTA);
  }
);

app.post(
  "/api/usuario",
  async (req, res) => {
    const { apelido, senha } = req.body;
    const RESPOSTA = await UsuarioController.buscarUsuario(apelido, senha);

    res.send(RESPOSTA);
  }
);

app.post(
  "/api/usuario/trocarSenha",
  async (req, res) => {
    const { chaveUnica, senha } = req.body;
    const RESPOSTA = await UsuarioController.trocarSenha(chaveUnica, senha);

    res.send(RESPOSTA);
  }
);

app.post(
  "/api/chats/",
  async (req, res) => {
    const { apelidoParticipante1, apelidoParticipante2 } = req.body;
    
    //const RESPOSTA = await UsuarioController.criarChat(apelido, mensagem);

    //res.send(RESPOSTA);
  }
);

app.post(
  "/api/chats/:id",
  async (req, res) => {
    const CHAT_ID = req.params.id;
    const { apelido } = req.body;

    //const RESPOSTA = await UsuarioController.buscarMensagensParaUsuario(apelido, CHAT_ID);

    //res.send(RESPOSTA);
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});