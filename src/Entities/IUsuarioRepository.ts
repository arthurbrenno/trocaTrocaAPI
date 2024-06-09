import { Mensagem } from "./Mensagem";
import { Apelido } from "./Primitives/Apelido";
import { Senha } from "./Primitives/Senha";
import { Usuario } from "./Usuario";

export interface IUsuarioRepository
{
    buscarUsuario(apelido: Apelido, senha: Senha): Promise<number>;
    buscarTodosUsuarios(apelido: Apelido): Promise<Object>;
    criarUsuario(usuario: Usuario): Promise<number>;
    trocarSenha(chaveUnica: string, senha: Senha): Promise<number>;
    enviarMensagem(mensagem: Mensagem): Promise<number>;
}