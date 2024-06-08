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
        const USUARIO: any = await this.database.ref(`apelidos/${APELIDO}`).once("value");

        if(USUARIO.exists()) return 1;

        return -1;
    }

    async buscarUsuario(apelido: Apelido, senha: Senha): Promise<number> {
        const APELIDO: string = apelido.get();
        const SENHA: string = senha.get();
    
        try {
            const SNAPSHOT_APELIDOS = await this.database.ref(`apelidos/${APELIDO}`).once("value");
            const CHAVE_UNICA = SNAPSHOT_APELIDOS.val();
    
            if (!CHAVE_UNICA) return -1;
            
            const SNAPSHOT_USUARIOS = await this.database.ref(`usuarios/${CHAVE_UNICA}`).once("value");
            const USUARIO = SNAPSHOT_USUARIOS.val();

            if (USUARIO.senha === SENHA) return 1;
 
            return -1;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return -1;
        }
    }

    async criarUsuario(usuario: Usuario): Promise<number>
    {
        const USUARIO_JA_EXISTE: number = await this.buscarUsuarioPorApelido(usuario.apelido);

        if (USUARIO_JA_EXISTE == 1) return -1;

        const APELIDO = usuario.apelido.get();
        const SENHA = usuario.senha.get();
        const CAMINHO_FOTO = usuario.caminhoFoto.get();
        const CHAVE_UNICA = usuario.getChaveUnica();

        try {
            const USUARIO_PLAIN = {
                senha: SENHA,
                caminhoFoto: CAMINHO_FOTO
            };

            await this.database.ref("usuarios").child(CHAVE_UNICA).set(USUARIO_PLAIN);
            await this.database.ref("apelidos").child(APELIDO).set(CHAVE_UNICA);

            return 1;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return -1;
        }
    }

    async trocarSenha(chaveUnica: string, senha: Senha): Promise<number>
    {
        try {
            const SENHA: string = senha.get();
            const SNAPSHOT: any = await this.database.ref(`usuarios/${chaveUnica}`).once("value");
            
            if(!SNAPSHOT.exists()) return -1;

            await this.database.ref(`usuarios/${chaveUnica}`).child("senha").set(SENHA);

            return 1;
        } catch (error) {
            return -1;
        }
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
            return -1;
        }
    }
}