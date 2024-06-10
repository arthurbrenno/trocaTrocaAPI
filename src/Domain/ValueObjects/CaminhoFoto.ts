export class CaminhoFoto {
  private caminhoFoto: string;

  constructor(caminhoFoto: string) {
    if (caminhoFoto.length < 0) {
      throw new Error("Campo vazio!");
    }
    this.caminhoFoto = caminhoFoto;
  }
  get(): string {
    return this.caminhoFoto;
  }
  set(caminhoFoto: string): void {
    this.caminhoFoto = caminhoFoto;
  }
}
