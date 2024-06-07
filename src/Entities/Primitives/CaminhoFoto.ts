export class CaminhoFoto
{
    private caminhoFoto: string;

    constructor(caminhoFoto: string)
    {
        this.caminhoFoto = caminhoFoto;
    }
    get(): string
    {
        return this.caminhoFoto;
    }
    set(caminhoFoto: string): void
    {
        this.caminhoFoto = caminhoFoto;
    }
}