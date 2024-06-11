import { JwtPayload } from "jsonwebtoken";

import { IChatRepository } from "../Repositories/IChatRepository";

import { Apelido } from "../Domain/ValueObjects/Apelido";

import { AuthService } from "../Services/AuthService";
import { IUsuarioRepository } from "../Repositories/IUsuarioRepository";

export class CriarChat {
  private chatRepository: IChatRepository;
  private usuarioRepository: IUsuarioRepository;
  private authKey: string;
  private apelidoParticipante2: string;

  constructor(
    chatRepository: IChatRepository,
    usuarioRepository: IUsuarioRepository,
    authKey: string,
    apelidoParticipante2: string,
  ) {
    this.chatRepository = chatRepository;
    this.usuarioRepository = usuarioRepository;
    this.authKey = authKey;
    this.apelidoParticipante2 = apelidoParticipante2;
  }

  async execute() {
    try {
      const USUARIO: JwtPayload = await AuthService.decodificarKey(
        this.authKey,
      );
  
      const APELIDO_PARITIPANTE_1 = new Apelido(USUARIO.apelido);
      const APELIDO_PARITIPANTE_2 = new Apelido(this.apelidoParticipante2);
  
      const USUARIO1_EXISTE = await this.usuarioRepository.buscarUsuarioPorApelido(APELIDO_PARITIPANTE_1);
      const USUARIO2_EXISTE = await this.usuarioRepository.buscarUsuarioPorApelido(APELIDO_PARITIPANTE_2);
  
      if(USUARIO1_EXISTE == -1 || USUARIO2_EXISTE == -1) return{
        linhasAfetadas: "-1"
      }
  
      const RESPOSTA = await this.chatRepository.criarChat(
        APELIDO_PARITIPANTE_1,
        APELIDO_PARITIPANTE_2,
      );
  
      if(RESPOSTA.codigo == 200) return RESPOSTA;
  
      return {
        linhasAfetadas: "-1"
      };
    } catch (error: any) {
      console.log(error.message);
      if(error.message == "jwt expired"){
        return {expired: true}
      }
      return {
        linhasAfetadas: "-1",
        "mensagem": ""
      };
    }
  }
}
