import md5 from "md5";
import { getManager } from "typeorm";
import Usuário, { Status } from "../entidades/usuário";
import GerenteEmpório from "../entidades/gerente-empório";
import ServiçosUsuário from "./serviços-usuário";
import CervejaArtesanal from "../entidades/cerveja-artesanal";
import Encomenda from "../entidades/encomenda";

export default class ServiçosGerenteEmpório {
  constructor() {}
  static async cadastrarGerenteEmpório(request, response) {
    try {
      const { usuário_info, telefone, localização_pais, nível_experiência } = request.body;
      const { usuário, token } = await ServiçosUsuário.cadastrarUsuário(
        usuário_info
      );
      const entityManager = getManager();
      await entityManager.transaction(async (transactionManager) => {
        await transactionManager.save(usuário);
        const gerenteEmpório = GerenteEmpório.create({ usuário, telefone, localização_pais, nível_experiência });
        await transactionManager.save(gerenteEmpório);
        await transactionManager.update(Usuário, usuário.cpf, {
          status: Status.ATIVO,
        });
        return response.json({ status: Status.ATIVO, token });
      });
    } catch (error) {
      return response.status(500).json({ erro: error });
    }
  }

  static async atualizarGerenteEmpório(request, response) {
    try {
      const { cpf, telefone, localização_pais, nível_experiência } = request.body;
      const cpf_encriptado = md5(cpf);
      await GerenteEmpório.update(
        { usuário: { cpf: cpf_encriptado } },
        { telefone, localização_pais, nível_experiência }
      );
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : atualizarGerenteEmpório" });
    }
  }

  static async buscarGerenteEmpório(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const gerenteEmpório = await GerenteEmpório.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      if (!gerenteEmpório)
        return response
          .status(404)
          .json({ erro: "Gerente Empório não encontrado." });
      return response.json({
        nome: gerenteEmpório.usuário.nome,
        telefone: gerenteEmpório.telefone,
        localização_pais: gerenteEmpório.localização_pais,
        nível_experiência: gerenteEmpório.nível_experiência,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarGerenteEmpório" });
    }
  }

  static async cadastrarEncomenda(request, response) {
    try {
      const { id_cerveja, data_encomenda, valor_total, quantidade, cpf } = request.body;
      const cpf_encriptado = md5(cpf);
      const gerenteEmpório = await GerenteEmpório.findOne({
        where: { usuário: cpf_encriptado },
      });
      const cervejaArtesanal = await CervejaArtesanal.findOne(id_cerveja);
      const encomendas = await Encomenda.find({
        where: { gerenteEmpório, cervejaArtesanal },
      });
      if (encomendas.length > 0)
        return response.status(404).json({
          erro: "O gerente empório já cadastrou encomenda para a cerveja artesanal.",
        });
      await Encomenda.create({
        cervejaArtesanal,
        data_encomenda,
        valor_total,
        quantidade,
        gerenteEmpório,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarEncomenda" });
    }
  }

  static async removerEncomenda(request, response) {
    try {
      const id = request.params.id;
      await Encomenda.delete(id);
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : removerEncomenda" });
    }
  }

  static async buscarEncomendasGerenteEmpório(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const encomendas = await Encomenda.find({
        where: { gerenteEmpório: { usuário: cpf_encriptado } },
        relations: [
          "gerenteEmpório",
          "gerenteEmpório.usuário",
          "cervejaArtesanal",
          "cervejaArtesanal.criador",
          "cervejaArtesanal.criador.usuário",
        ],
      });
      return response.json(encomendas);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasGerenteEmpório" });
    }
  }

  static async buscarCervejasArtesanais(request, response) {
    try {
      const cervejas = await CervejaArtesanal.find({
        relations: ["criador", "criador.usuário"],
      });
      return response.json(cervejas);
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : buscarCervejas" });
    }
  }
}