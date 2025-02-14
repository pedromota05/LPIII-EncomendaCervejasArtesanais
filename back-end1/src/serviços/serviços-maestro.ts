import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import Maestro from "../entidades/maestro";
export default class ServiçosMaestro {
  constructor() {}
  static async cadastrarMaestro(request, response) {
    try {
      const { usuário_info, titulação, anos_experiência, especialidade } =
        request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const maestro = Maestro.create({
          usuário,
          titulação,
          anos_experiência,
          especialidade,
        });
        await transactionManager.save(maestro);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }
  static async buscarMaestro(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const maestro = await Maestro.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!maestro)
        return response.status(404).json({ erro: "Maestro não encontrado." });
      return response.json({
        nome: maestro.usuário.nome,
        email: maestro.usuário.email,
        titulação: maestro.titulação,
        anos_experiência: maestro.anos_experiência,
        especialidade: maestro.especialidade,
      });
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarMaestro" });
    }
  }
}
