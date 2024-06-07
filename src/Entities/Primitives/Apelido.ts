export class Apelido
{
    private apelido: string;

    constructor(apelido: string)
    {
        this.apelido = apelido;
    }
    get(): string
    {
        return this.apelido;
    }
    set(apelido: string): void
    {
        this.apelido = apelido;
    }
}