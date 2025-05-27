import { Router } from "express";

import verificarToken from "../middlewares/verificar-token";
import ServiçosCriador from "src/serviços/serviços-criador";
import verificarPerfilCriador from "../middlewares/verificar-perfil-criador";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

const RotasCriador = Router();
export default RotasCriador;

RotasCriador.post("/", ServiçosCriador.cadastrarCriador);
RotasCriador.get(
  "/:cpf",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.buscarCriador
);

RotasCriador.patch(
  "/",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.atualizarCriador
);

RotasCriador.post(
  "/cervejas-artesanais",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.cadastrarCervejaArtesanal
);

RotasCriador.patch(
  "/cervejas-artesanais",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.alterarCervejaArtesanal
);

RotasCriador.delete(
  "/cervejas-artesanais/:id",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.removerCervejaArtesanal
);

RotasCriador.get(
  "/cervejas-artesanais/criador/:cpf",
  verificarToken,
  verificarPerfilCriador,
  verificarErroConteúdoToken,
  ServiçosCriador.buscarCervejasArtesanaisCriador
);

RotasCriador.get(
  "/cervejas-artesanais/encomendas",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.buscarEncomendasCervejasArtesanais
);

RotasCriador.get(
  "/encomendas/:id_cervejaArtesanal", 
  verificarToken, 
  verificarPerfilCriador,
  ServiçosCriador.buscarEncomendasCervejaArtesanal
);
