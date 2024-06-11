import express from "express";
import { UsuarioController } from "../src/Presentation/UsuarioController";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite solicitações de qualquer origem
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  ); // Define os métodos HTTP permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Define os cabeçalhos permitidos
  next();
});

app.get("/", (req, res) => {
  res.send({
    Author: "Pablio Richardy",
    GitHub: "",
    Descrição:
      "Bem-vindo ao trocaTroca, o app onde você troca mensagens mais rápido que troca de roupa! Com velocidade supersônica e segurança digna de espião, prepare-se para revolucionar suas conversas com um toque de loucura!",
  });
});

app.get("/api/usuarios", async (req, res) => {
  const AUTH_KEY: any = req.headers.authorization;

  const RESPOSTA = await UsuarioController.buscarUsuarios(AUTH_KEY);

  res.send(RESPOSTA);
});

app.post("/api/usuarios", async (req, res) => {
  const { apelido, senha, caminhoFoto } = req.body;
  console.log(req.body);
  const RESPOSTA = await UsuarioController.criarUsuario(
    apelido,
    senha,
    caminhoFoto,
  );

  res.send(RESPOSTA);
});

app.post("/api/usuario", async (req, res) => {
  const { apelido, senha } = req.body;
  const RESPOSTA = await UsuarioController.buscarUsuario(apelido, senha);

  res.send(RESPOSTA);
});

app.put(
  "/api/usuario/trocarSenha",
  async (req, res) => {
    const { chaveUnica, senha } = req.body;
    const RESPOSTA = await UsuarioController.trocarSenha(chaveUnica, senha);

  res.send(RESPOSTA);
});

app.post("/api/usuario/chats/", async (req, res) => {
  const { authKey, apelidoParticipante2 } = req.body;
  console.log(req.body, apelidoParticipante2);
  const RESPOSTA = await UsuarioController.criarChat(
    authKey, 
    apelidoParticipante2
  );

  res.send(RESPOSTA);
});

app.post("/api/ai/completions/", async (req, res) => {
  const { mensagens } = req.body;
  res.send(await UsuarioController.obterAICompletion(mensagens));
});


app.post(
  "/api/mensagens/",
  async (req, res) => {
    const { authKey, chat_id, mensagem, timestamp } = req.body;

    console.log(req.body);

    res.send(await UsuarioController.enviarMensagem(authKey, chat_id, mensagem, timestamp));
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
