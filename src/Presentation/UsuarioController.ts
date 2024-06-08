import { FirebaseDB } from "../Infrastructre/FirebaseDB";

import { CriarUsuario } from "../UseCases/CriarUsuario";
import { EnviarMensagem } from "../UseCases/EnviarMensagem";
import { BuscarUsuario } from "../UseCases/BuscarUsuario";
import { TrocarSenha } from "../UseCases/TrocarSenha";

export class UsuarioController
{
    static async criarUsuario(
        apelido: string, 
        senha: string, 
        caminhoFoto: string
    ): Promise<Object>
    {
        const FIREBASE_DB = new FirebaseDB();
        const CRIAR_USUARIO_USE_CASE = new CriarUsuario(
            FIREBASE_DB, 
            apelido, 
            senha, 
            caminhoFoto
        );

        return await CRIAR_USUARIO_USE_CASE.execute();
    }

    static async enviarMensagem(
        apelido: string,
        mensagem: string
    ): Promise<Object>
    {
        const FIREBASE_DB = new FirebaseDB();
        const ENVIAR_MENSAGEM_USE_CASE = new EnviarMensagem(
            FIREBASE_DB, 
            apelido, 
            mensagem
        );

        return ENVIAR_MENSAGEM_USE_CASE.execute();
    }

    static async buscarUsuario(
        apelido: string,
        senha: string
    )
    {
        const FIREBASE_DB = new FirebaseDB();
        const BUSCAR_USUARIO_USE_CASE = new BuscarUsuario(FIREBASE_DB, apelido, senha); 
        
        return await BUSCAR_USUARIO_USE_CASE.execute();
    }

    static async trocarSenha(
        chaveUnica: string,
        senha: string
    )
    {
        const FIREBASE_DB = new FirebaseDB();
        const TROCAR_SENHA_USE_CASE = new TrocarSenha(FIREBASE_DB, chaveUnica, senha);

        return await TROCAR_SENHA_USE_CASE.execute();
    }
}