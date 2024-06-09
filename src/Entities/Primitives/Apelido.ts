export class Apelido
{
    private apelido: string;

    constructor(apelido: string)
    {
        if(!apelido || apelido.length < 3)
        {
            throw new Error("Apelido menor que 3 caracteres!");
        }
        this.apelido = this.stripTags(apelido);
    }
    get(): string
    {
        return this.apelido;
    }
    set(apelido: string): void
    {
        this.apelido = apelido;
    }
    private stripTags(apelido: string): string
    {
        return apelido.replace(/<\/?[^>]+(>|$)/g, "");
    }
}