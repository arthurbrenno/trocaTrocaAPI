import { JwtPayload } from "jsonwebtoken";

import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Apelido } from "../Entities/Primitives/Apelido";
import { AuthService } from "../Services/AuthService";

export class BuscarTodosUsuarios
{
    private usuarioRepository: IUsuarioRepository;
    private authKey: string;

    constructor(usuarioRepository: IUsuarioRepository, authKey: string)
    {
        this.usuarioRepository = usuarioRepository;
        this.authKey = authKey;
    }
    
    async execute(): Promise<Object>
    {
        try{
            const USUARIO: JwtPayload = await AuthService.decodificarKey(this.authKey);

            const APELIDO = new Apelido(USUARIO.apelido);
            const USUARIOS = await this.usuarioRepository.buscarTodosUsuarios(APELIDO);

            if(USUARIOS.hasOwnProperty("codigo")) return {
                codigo: "401",
                mensagem: "Não foi encontrado um usuário!"
            };

            if( Object.keys(USUARIOS).length == 0 ) return {
                mensagem: "Não há mais usuários no momento!"
            };
    
            return USUARIOS;
        }
        catch(erro){
            return{
                "codigo": 401
            }
        }
    }
}