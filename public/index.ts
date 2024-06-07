import express from 'express';
import { UsuarioController } from '../src/Presentation/UsuarioController';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Worlddd!');
});

app.post('/api/usuarios',
  async (req, res) => {
    const { apelido, senha, caminhoFoto } = req.body;

    const RESPONSE = await UsuarioController.criarUsuario(apelido, senha, caminhoFoto);

    res.send(RESPONSE);
  }
);

app.post('/api/mensagens',
  async (req, res) => {
    const { apelido, mensagem } = req.body;

    const RESPONSE = await UsuarioController.enviarMensagem(apelido, mensagem);

    res.send(RESPONSE);
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});