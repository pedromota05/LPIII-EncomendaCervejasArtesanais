import md5 from "md5";
import { getManager } from "typeorm";

import Usuário, { Status } from "../entidades/usuário";
import ServiçosUsuário from "./serviços-usuário";
import Criador from "../entidades/criador";
import CervejaArtesanal from "../entidades/cerveja-artesanal";

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

  static async atualizarCriador(request, response) {
    try {
      const { cpf, pais_origem, ano_fundação, estilo_cerveja_especializado } = request.body;
      const cpf_encriptado = md5(cpf);
      await Criador.update(
        { usuário: { cpf: cpf_encriptado } },
        { pais_origem, ano_fundação, estilo_cerveja_especializado }
      );
      return response.json();
    } catch (error) {
      return response.status(500).json({ erro: "Erro BD : atualizarCriador" });
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

  static async cadastrarCervejaArtesanal(request, response) {
    try {
      const { nome, teor_alcoolico, categoria, disponibilidade, contem_gluten, cpf } = request.body;
      const cpf_encriptado = md5(cpf);
      const criador = await Criador.findOne({
        where: { usuário: cpf_encriptado },
        relations: ["usuário"],
      });
      await CervejaArtesanal.create({
        nome,
        teor_alcoolico,
        categoria,
        disponibilidade,
        contem_gluten,
        criador,
      }).save();
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : cadastrarCervejaArtesanal" });
    }
  }

  static async alterarCervejaArtesanal(request, response) {
    try {
      const { id, nome, teor_alcoolico, categoria, disponibilidade, contem_gluten } = request.body;
      await CervejaArtesanal.update(id, {
        nome,
        teor_alcoolico,
        categoria,
        disponibilidade,
        contem_gluten
      });
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : alterarCervejaArtesanal", error });
    }
  }

  static async removerCervejaArtesanal(request, response) {
    try {
      const id_cerveja = request.params.id;
      const cervejaArtesanal = await CervejaArtesanal.findOne(id_cerveja);
      await CervejaArtesanal.remove(cervejaArtesanal);
      return response.json();
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : removerCervejaArtesanal" });
    }
  }

  static async buscarCervejasArtesanaisCriador(request, response) {
    try {
      const cpf_encriptado = md5(request.params.cpf);
      const cervejasArtesanais = await CervejaArtesanal.find({
        where: { criador: { usuário: cpf_encriptado } },
        relations: ["criador", "criador.usuário"],
      });
      return response.json(cervejasArtesanais);
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarCervejasArtesanaisCriador" });
    }
  }

  static filtrarCategoriasEliminandoRepetição(cervejasArtesanais: CervejaArtesanal[]) {
    let categorias: { label: string; value: string }[];
    categorias = cervejasArtesanais
      .filter(
        (cervejaArtesanal, índice, cervejas_antes_filtrar) =>
          cervejas_antes_filtrar.findIndex(
            (cerveja_anterior) => cerveja_anterior.categoria === cervejaArtesanal.categoria
          ) === índice
      )
      .map((cervejaArtesanal) => ({
        label: cervejaArtesanal.categoria,
        value: cervejaArtesanal.categoria,
      }));
    return categorias;
  }

  static async buscarEncomendasCervejasArtesanais(request, response) {
    try {
      const cervejasArtesanais = await CervejaArtesanal.find();
      const categorias =
        ServiçosCriador.filtrarCategoriasEliminandoRepetição(cervejasArtesanais);
      return response.json(categorias.sort());
    } catch (error) {
      return response
        .status(500)
        .json({ erro: "Erro BD : buscarEncomendasCervejasArtesanais" });
    }
  }
}
