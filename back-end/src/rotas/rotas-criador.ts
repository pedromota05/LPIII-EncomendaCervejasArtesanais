import { Router } from "express";

import verificarToken from "../middlewares/verificar-token";
import ServiçosCriador from "src/serviços/serviços-criador";
import verificarPerfilCriador from "../middlewares/verificar-perfil-criador";

const RotasCriador = Router();
export default RotasCriador;
RotasCriador.post("/", ServiçosCriador.cadastrarCriador);
RotasCriador.get(
  "/:cpf",
  verificarToken,
  verificarPerfilCriador,
  ServiçosCriador.buscarCriador
);
