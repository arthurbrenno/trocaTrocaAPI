import jwt, { JwtPayload } from "jsonwebtoken";

import { Apelido } from "../Domain/ValueObjects/Apelido";

export class AuthService {
  private static SECRET_KEY: string = "hiPopoTomOnstRosesquipedAlIOfObIa";

    static gerarKey(apelido: Apelido)
    {
        const PAYLOAD = {
            "apelido": apelido.get(),
        }
        return jwt.sign(PAYLOAD, AuthService.SECRET_KEY, {expiresIn: "2h"});
    }
    static async decodificarKey(authKey: string): Promise<JwtPayload | {}> 
    {
        try {
            const AUTH_KEY_DECODIFICADA = await jwt.verify(authKey, AuthService.SECRET_KEY);
            return AUTH_KEY_DECODIFICADA as JwtPayload; // Assume que o payload do token JWT é JwtPayload
        } catch (err: any) {
            console.error('Erro ao decodificar o token:', err);
            throw Error(err.message);
        }
    }
    
}
