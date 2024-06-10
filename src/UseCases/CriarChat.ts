import { IChatRepository } from "../Repositories/IChatRepository";
import { Apelido } from "../Domain/ValueObjects/Apelido";

class CriarChat {
  private chatRepository: IChatRepository;
  private apelidoParticipante1: string;
  private apelidoParticipante2: string;

  constructor(
    chatRepository: IChatRepository,
    apelidoParticipante1: string,
    apelidoParticipante2: string,
  ) {
    this.chatRepository = chatRepository;
    this.apelidoParticipante1 = apelidoParticipante1;
    this.apelidoParticipante2 = apelidoParticipante2;
  }
  execute() {
    const APELIDO_PARITIPANTE_1 = new Apelido(this.apelidoParticipante1);
    const APELIDO_PARITIPANTE_2 = new Apelido(this.apelidoParticipante2);

    const RESPOSTA = this.chatRepository.criarChat(
      APELIDO_PARITIPANTE_1,
      APELIDO_PARITIPANTE_2,
    );

    return RESPOSTA;
  }
}
