import admin from "firebase-admin";
import { Database } from "firebase-admin/database";

import { IUsuarioRepository } from "../Entities/IUsuarioRepository";
import { IChatRepository } from "../Entities/IChatRepository";

import { Usuario } from "../Entities/Usuario";
import { Senha } from "../Entities/Primitives/Senha";
import { Mensagem } from "../Entities/Mensagem";
import { Apelido } from "../Entities/Primitives/Apelido";

const SERVICE_ACCOUNT_KEY = require("../Resources/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT_KEY),
    databaseURL: "https://trocatroca-a1e30-default-rtdb.firebaseio.com"
});

export class FirebaseDB implements IUsuarioRepository, IChatRepository
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

    async buscarTodosUsuarios(apelido: Apelido): Promise<Object> {
        if(await this.buscarUsuarioPorApelido(apelido) == -1) return { "codigo": 401 };

        const SNAPSHOT = await this.database.ref("apelidos").once("value");
        const USUARIOS = SNAPSHOT.val()

        if(USUARIOS.hasOwnProperty(apelido.get())) delete USUARIOS[apelido.get()];

        const APELIDOS = Object.keys(USUARIOS);
    
        return APELIDOS;
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
            const MENSAGEM_PLAIN = {
                apelido: mensagem.apelido.get(),
                senha: mensagem.get()
            };

            await this.database.ref("mensagens").push(MENSAGEM_PLAIN);
            return 1;
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            return -1;
        }
    }

    async criarChat(apelidoParticipante1: Apelido, apelidoParticipante2: Apelido)
    {
        try{
            const APELIDO_PARITIPANTE_1 = apelidoParticipante1.get();
            const APELIDO_PARITIPANTE_2 = apelidoParticipante2.get();
            const CHAT = this.database.ref("chats").push();
            const CHAT_ID = CHAT.key;

            const CHAT_PLAIN = {
                "participantes": {
                    APELIDO_PARITIPANTE_1: true,
                    APELIDO_PARITIPANTE_2: true
                },
                mensagens: {}
            }

            await CHAT.set(CHAT_PLAIN);

            return{
                "codigo": 200,
                "chat_id": CHAT_ID
            }
        } catch(error) {
            console.error("Erro ao enviar mensagem:", error);
            return {};
        }
    }
}