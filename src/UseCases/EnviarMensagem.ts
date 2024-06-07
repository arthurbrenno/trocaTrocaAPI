import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Mensagem } from "../Entities/Mensagem";
import { Usuario } from "../Entities/Usuario";

export class EnviarMensagem
{
    private usuarioRepository: IUsuarioRepository;

    private apelido: string;
    private mensagem: string;

    constructor(
        usuarioRepository: IUsuarioRepository, 
        apelido: string, 
        mensagem: string
    )
    {
        this.usuarioRepository = usuarioRepository;
        this.apelido = apelido;
        this.mensagem = mensagem;
    }

    async execute(): Promise<Object>
    {
        const MENSAGEM = new Mensagem(this.apelido, this.mensagem);

        const response = await this.usuarioRepository.enviarMensagem(MENSAGEM);
        
        return {
            "rowsAffected": response
        }
    }
}