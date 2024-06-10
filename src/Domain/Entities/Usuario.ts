import { Apelido } from "../ValueObjects/Apelido";
import { CaminhoFoto } from "../ValueObjects/CaminhoFoto";
import { Senha } from "../ValueObjects/Senha";

export class Usuario {
  public apelido!: Apelido;
  public senha!: Senha;
  public caminhoFoto!: CaminhoFoto;
  private chaveUnica!: string;

  constructor(
    apelido: string,
    senha: string,
    caminhoFoto: string,
    chaveUnica: string,
  ) {
    try {
      this.apelido = new Apelido(apelido);
      this.senha = new Senha(senha);
      this.caminhoFoto = new CaminhoFoto(caminhoFoto);
      this.chaveUnica = chaveUnica;
    } catch (error: any) {
      return error.message;
    }
  }
  getChaveUnica() {
    return this.chaveUnica;
  }
}
