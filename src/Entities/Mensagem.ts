import { Apelido } from "./Primitives/Apelido";

export class Mensagem
{
    public apelido: Apelido;
    private mensagem: string;

    constructor(apelido: string, mensagem: string)
    {
        this.apelido = new Apelido(apelido);
        this.mensagem = mensagem;
    }
    get(): string
    {
        return this.mensagem;
    }
    set(mensagem: string): void
    {
        this.mensagem = mensagem;
    }
}