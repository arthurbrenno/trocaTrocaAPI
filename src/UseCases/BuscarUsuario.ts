import { IUsuarioRepository } from "../Repositories/IUsuarioRepository";
import { Apelido } from "../Domain/ValueObjects/Apelido";
import { Senha } from "../Domain/ValueObjects/Senha";
import { Usuario } from "../Domain/Entities/Usuario";
import { HashService } from "../Services/HashService";

export class BuscarUsuario {
  private usuarioRepository: IUsuarioRepository;
  private apelido: string;
  private senha: string;

  constructor(
    usuarioRepository: IUsuarioRepository,
    apelido: string,
    senha: string,
  ) {
    this.usuarioRepository = usuarioRepository;
    this.apelido = apelido;
    this.senha = senha;
  }

  async execute() {
    try {
      const APELIDO: Apelido = new Apelido(this.apelido);
      const SENHA: Senha = new Senha(HashService.generate(this.senha));

      const RESPONSE: number = await this.usuarioRepository.buscarUsuario(
        APELIDO,
        SENHA,
      );

      if (RESPONSE == -1)
        return {
          codigo: 401,
          mensagem: "Usuário não existe!",
        };

      return {
        codigo: 200,
        mensagem: "Usuário existe!",
      };
    } catch (error: any) {
      return {
        codigo: 401,
        mensagem: error.message,
      };
    }
  }
}
