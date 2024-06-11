import { Apelido } from "../Domain/ValueObjects/Apelido";

export interface IChatRepository {
  criarChat(participante1: Apelido, participante2: Apelido): Promise<{ codigo: number; chat_id?: string }>;
}
