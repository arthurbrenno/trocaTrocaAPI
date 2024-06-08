export class Apelido
{
    private apelido: string;

    constructor(apelido: string)
    {
        if(apelido.length > 3)
        {
            this.apelido = apelido;
            return;
        }
        throw new Error("Apelido menor que 3 caracteres!");
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