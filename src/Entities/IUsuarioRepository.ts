import { Mensagem } from "./Mensagem";
import { Senha } from "./Primitives/Senha";
import { Usuario } from "./Usuario";

export interface IUsuarioRepository
{
    criarUsuario(usuario: Usuario): Promise<number>;
    trocarSenha(senha: Senha): any;
    enviarMensagem(mensagem: Mensagem): Promise<number>;
}