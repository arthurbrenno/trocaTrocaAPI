import { Mensagem } from "./Mensagem";
import { Apelido } from "./Primitives/Apelido";
import { Senha } from "./Primitives/Senha";
import { Usuario } from "./Usuario";

export interface IUsuarioRepository
{
    buscarUsuario(apelido: Apelido, senha: Senha): Promise<number>;
    criarUsuario(usuario: Usuario): Promise<number>;
    trocarSenha(senha: Senha): any;
    enviarMensagem(mensagem: Mensagem): Promise<number>;
}