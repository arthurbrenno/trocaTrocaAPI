import { Mensagem } from "../Domain/ValueObjects/Mensagem";
import { Apelido } from "../Domain/ValueObjects/Apelido";
import { Senha } from "../Domain/ValueObjects/Senha";
import { Usuario } from "../Domain/Entities/Usuario";

export interface IUsuarioRepository {
  buscarUsuario(apelido: Apelido, senha: Senha): Promise<number>;
  buscarTodosUsuarios(apelido: Apelido): Promise<Object>;
  criarUsuario(usuario: Usuario): Promise<number>;
  trocarSenha(chaveUnica: string, senha: Senha): Promise<number>;
  enviarMensagem(mensagem: Mensagem): Promise<number>;
}
