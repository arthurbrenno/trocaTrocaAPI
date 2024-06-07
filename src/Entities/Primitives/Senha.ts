export class Senha
{
    private senha: string;

    constructor(senha: string)
    {
        this.senha = senha;
    }
    get(): string
    {
        return this.senha;
    }
    set(senha: string): void
    {
        this.senha = senha;
    }
}