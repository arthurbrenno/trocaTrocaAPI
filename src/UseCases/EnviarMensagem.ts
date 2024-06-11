import { JwtPayload } from "jsonwebtoken";

import { AuthService } from "../Services/AuthService";

import { IUsuarioRepository } from "../Repositories/IUsuarioRepository";
import { Mensagem } from "../Domain/ValueObjects/Mensagem";

export class EnviarMensagem {
  private usuarioRepository: IUsuarioRepository;

  private authKey: string;
  private mensagem: string;
  private timestamp: string;
  private chat_id: string;

  constructor(
    usuarioRepository: IUsuarioRepository,
    authKey: string,
    chat_id: string,
    mensagem: string,
    timestamp: string
  ) {
    this.usuarioRepository = usuarioRepository;
    this.authKey = authKey;
    this.chat_id = chat_id;
    this.mensagem = mensagem;
    this.timestamp = timestamp;
  }

  async execute(): Promise<Object> {
    const USUARIO: JwtPayload = await AuthService.decodificarKey(
      this.authKey,
    );
    console.log("Antes mensagem:", this.chat_id, USUARIO.apelido);
    const MENSAGEM = new Mensagem(USUARIO.apelido, this.chat_id, this.mensagem, this.timestamp);
    console.log("Apos mensagem:", MENSAGEM.chat_id, MENSAGEM.apelido);
    const response = await this.usuarioRepository.enviarMensagem(MENSAGEM);

    return {
      rowsAffected: response,
    };
  }
}
