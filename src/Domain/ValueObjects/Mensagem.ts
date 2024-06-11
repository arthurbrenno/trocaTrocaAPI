import { Apelido } from "./Apelido";

export class Mensagem {
  public apelido: Apelido;
  public mensagem: string;
  public timestamp: string;
  public chat_id: string;

  constructor(apelido: string, chat_id: string, mensagem: string, timestamp: string) {
    this.apelido = new Apelido(apelido);
    this.chat_id = chat_id;
    this.mensagem = mensagem;
    this.timestamp = timestamp;

  }
  get(): string {
    return this.mensagem;
  }
  set(mensagem: string): void {
    this.mensagem = mensagem;
  }
}
