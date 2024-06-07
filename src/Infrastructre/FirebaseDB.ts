import admin from "firebase-admin";

import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Database } from "firebase-admin/database";

import { Usuario } from "../Entities/Usuario";
import { Senha } from "../Entities/Primitives/Senha";
import { Apelido } from "../Entities/Primitives/Apelido";
import { Mensagem } from "../Entities/Mensagem";

const SERVICE_ACCOUNT_KEY = require("../Resources/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT_KEY),
    databaseURL: "https://trocatroca-a1e30-default-rtdb.firebaseio.com"
});

export class FirebaseDB implements IUsuarioRepository
{
    private database: Database;

    constructor()
    {
        this.database = admin.database();
    }

    async criarUsuario(usuario: Usuario): Promise<number>
    {
        const apelido = usuario.apelido.get();
        const USUARIO = await this.database.ref("usuarios").child(apelido).once("value");

        if (USUARIO.exists()) return -1;

        try {
            const usuarioPlain = {
                apelido: usuario.apelido.get(),
                senha: usuario.senha.get(),
                caminhoFoto: usuario.caminhoFoto.get(),
                chaveUnica: usuario.getChaveUnica()
            };

            await this.database.ref("usuarios").child(apelido).set(usuarioPlain);
            return 1;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return -1;
        }
    }

    trocarSenha(senha: Senha) {
        
    }

    async enviarMensagem(mensagem: Mensagem): Promise<number>{
        try {
            const mensagemPlain = {
                apelido: mensagem.apelido.get(),
                senha: mensagem.get()
            };

            await this.database.ref("mensagens").push(mensagemPlain);
            return 1;
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            return -1; // Falha
        }
    }
}