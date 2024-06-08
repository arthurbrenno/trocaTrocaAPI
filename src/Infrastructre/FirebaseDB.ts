import admin from "firebase-admin";

import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { Database } from "firebase-admin/database";

import { Usuario } from "../Entities/Usuario";
import { Senha } from "../Entities/Primitives/Senha";
import { Mensagem } from "../Entities/Mensagem";
import { Apelido } from "../Entities/Primitives/Apelido";

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

    private async buscarUsuarioPorApelido(apelido: Apelido): Promise<number> {
        const APELIDO: string = apelido.get();
        const USUARIO: any = await this.database.ref("usuarios").child(APELIDO).once("value");

        if(USUARIO.exists()) return 1;

        return -1;
    }

    async buscarUsuario(apelido: Apelido, senha: Senha): Promise<number> {
        const APELIDO: string = apelido.get();
        const SENHA: string = senha.get();
    
        try {
            const snapshot = await this.database.ref(`usuarios/${APELIDO}`).once("value");
            const usuario = snapshot.val();
    
            if (!usuario) return -1; // Usuário não encontrado
    
            // Verificar se a senha fornecida corresponde à senha armazenada
            if (usuario.senha === SENHA) {
                return 1; // Senha correta
            } else {
                return -1; // Senha incorreta
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return -1; // Erro ao buscar usuário
        }
    }

    async criarUsuario(usuario: Usuario): Promise<number>
    {
        const USUARIO_JA_EXISTE: number = await this.buscarUsuarioPorApelido(usuario.apelido);

        if (USUARIO_JA_EXISTE == 1) return -1;

        const APELIDO = usuario.apelido.get();
        const SENHA = usuario.senha.get();
        const CAMINHO_FOTO = usuario.caminhoFoto.get();

        try {
            const USUARIO_PLAIN = {
                senha: SENHA,
                caminhoFoto: CAMINHO_FOTO
            };

            await this.database.ref("usuarios").child(APELIDO).set(USUARIO_PLAIN);
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