import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Usuario } from "../Entities/Usuario";

import { ChaveUnicaService } from "../Services/ChaveUnicaService";
import { HashService } from "../Services/HashService";

export class CriarUsuario
{
    private usuarioRepository: IUsuarioRepository;

    private apelido: string;
    private senha: string;
    private caminhoFoto: string;

    constructor(
        usuarioRepository: IUsuarioRepository, 
        apelido: string, 
        senha: string,
        caminhoFoto: string
    )
    {
        this.usuarioRepository = usuarioRepository;
        this.apelido = apelido;
        this.senha = senha;
        this.caminhoFoto = caminhoFoto;
    }
    async execute(): Promise<Object>
    {
        const CHAVE_UNICA = ChaveUnicaService.criar(this.apelido);
        const CHAVE_HASHIFICADA = HashService.generate(this.senha);

        const USUARIO = new Usuario(this.apelido, CHAVE_HASHIFICADA, this.caminhoFoto, CHAVE_UNICA);
        const RESPONSE = await this.usuarioRepository.criarUsuario(USUARIO);

        if(RESPONSE == -1) {
            return {
                "linhasAfetadas": RESPONSE
            }
        }

        return {
            "linhasAfetadas": RESPONSE,
            "chaveUnica": USUARIO.getChaveUnica() 
        }
        
    }
}