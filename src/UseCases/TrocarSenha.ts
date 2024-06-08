import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Senha } from "../Entities/Primitives/Senha";
import { HashService } from "../Services/HashService";

export class TrocarSenha
{
    private usuarioRepository: IUsuarioRepository;
    private chaveUnica: string;
    private senha: string;

    constructor(usuarioRepository: IUsuarioRepository, chaveUnica: string, senha: string)
    {
        this.usuarioRepository = usuarioRepository;
        this.chaveUnica = chaveUnica;
        this.senha = senha;
    }

    async execute()
    {
        const SENHA = new Senha(this.senha);
        SENHA.set(HashService.generate(this.senha));
        
        const RESPOSTA: number =  await this.usuarioRepository.trocarSenha(this.chaveUnica, SENHA);

        if(RESPOSTA == 1) return {
            "linhasAfetadas": RESPOSTA
        }

        return {
            "linhasAfetadas": RESPOSTA
        }
    }
}