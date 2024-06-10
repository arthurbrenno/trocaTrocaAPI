export class Senha {
  private senha: string;

  constructor(senha: string) {
    if (senha.length < 0) {
      throw new Error("Senha vazia!");
    }
    this.senha = senha;
  }
  get(): string {
    return this.senha;
  }
  set(senha: string): void {
    this.senha = senha;
  }
}
