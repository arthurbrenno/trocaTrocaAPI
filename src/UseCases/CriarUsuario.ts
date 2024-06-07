import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Usuario } from "../Entities/Usuario";

import { ChaveUnicaService } from "../Services/ChaveUnicaService";

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
        const CHAVE_UNICA = ChaveUnicaService.criar(this.senha);

        const USUARIO = new Usuario(this.apelido, this.senha, this.caminhoFoto, CHAVE_UNICA);

        const response = await this.usuarioRepository.criarUsuario(USUARIO);
        
        if(response == -1) {
            return {
                "rowsAffected": response
            }
        }

        return {
            "rowsAffected": response,
            "chaveUnica": USUARIO.getChaveUnica() 
        }
        
    }
}