import { FirebaseDB } from "../Infrastructre/FirebaseDB";

import { BuscarTodosUsuarios } from "../UseCases/BuscarTodosUsuarios";
import { BuscarUsuario } from "../UseCases/BuscarUsuario";
import { CriarUsuario } from "../UseCases/CriarUsuario";
import { TrocarSenha } from "../UseCases/TrocarSenha";
import { EnviarMensagem } from "../UseCases/EnviarMensagem";
import { AICompletionUseCase } from "../UseCases/AICompletionUseCase";

export class UsuarioController {
  private static FIREBASE_DB = new FirebaseDB();

  static async buscarUsuarios(authKey: any): Promise<Object> {
    const BUSCAR_TODOS_USUARIOS_USE_CASE = new BuscarTodosUsuarios(
      this.FIREBASE_DB,
      authKey,
    );

    return BUSCAR_TODOS_USUARIOS_USE_CASE.execute();
  }

  static async criarUsuario(
    apelido: string,
    senha: string,
    caminhoFoto: string,
  ): Promise<Object> {
    const CRIAR_USUARIO_USE_CASE = new CriarUsuario(
      this.FIREBASE_DB,
      apelido,
      senha,
      caminhoFoto,
    );

    return await CRIAR_USUARIO_USE_CASE.execute();
  }

  static async enviarMensagem(
    apelido: string,
    mensagem: string,
  ): Promise<Object> {
    const ENVIAR_MENSAGEM_USE_CASE = new EnviarMensagem(
      this.FIREBASE_DB,
      apelido,
      mensagem,
    );

    return ENVIAR_MENSAGEM_USE_CASE.execute();
  }

  static async buscarUsuario(apelido: string, senha: string) {
    const BUSCAR_USUARIO_USE_CASE = new BuscarUsuario(
      this.FIREBASE_DB,
      apelido,
      senha,
    );

    return await BUSCAR_USUARIO_USE_CASE.execute();
  }

  static async trocarSenha(chaveUnica: string, senha: string) {
    const TROCAR_SENHA_USE_CASE = new TrocarSenha(
      this.FIREBASE_DB,
      chaveUnica,
      senha,
    );

    return await TROCAR_SENHA_USE_CASE.execute();
  }

  static async obterAICompletion(mensagens: string[]) {
    return new AICompletionUseCase(mensagens).execute();
  }
}
