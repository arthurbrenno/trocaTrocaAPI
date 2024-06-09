import jwt, { JwtPayload } from "jsonwebtoken";

import {Usuario} from "../Entities/Usuario";

export class AuthService
{
    private static SECRET_KEY: string = "hiPopoTomOnstRosesquipedAlIOfObIa";

    static gerarKey(usuario: Usuario)
    {
        const PAYLOAD = {
            "apelido": usuario.apelido.get(),
            "caminhoFoto": usuario.caminhoFoto.get()
        }

        return jwt.sign(PAYLOAD, AuthService.SECRET_KEY, {expiresIn: "2h"});
    }
    static async decodificarKey(authKey: string): Promise<JwtPayload | {}> 
    {
        try {
            const AUTH_KEY_DECODIFICADA = await jwt.verify(authKey, AuthService.SECRET_KEY);
            return AUTH_KEY_DECODIFICADA as JwtPayload; // Assume que o payload do token JWT é JwtPayload
        } catch (err) {
            console.error('Erro ao decodificar o token:', err);
            return {};
        }
    }
    
}