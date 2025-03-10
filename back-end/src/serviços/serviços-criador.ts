import md5 from "md5";
import { getManager } from "typeorm";

import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import Criador from "../entidades/criador";

export default class ServiçosCriador {
  constructor() {}
  static async cadastrarCriador(request, response) {
    try {
      const { usuário_info, pais_origem, ano_fundação, estilo_cerveja_especializado } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const criador = Criador.create({ usuário, pais_origem, ano_fundação, estilo_cerveja_especializado});
        await transactionManager.save(criador);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async buscarCriador(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const criador = await Criador.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!criador) return response.status(404).json({ erro: "Criador não encontrado." });
      return response.json({
        nome: criador.usuário.nome,
        email: criador.usuário.email,
        pais_origem: criador.pais_origem,
        ano_fundação: criador.ano_fundação,
        estilo_cerveja_especializado: criador.estilo_cerveja_especializado,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarCriador" });
    }
  }
}
