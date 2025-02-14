import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import ServiçosMaestro from "src/serviços/serviços-maestro";
import verificarPerfilMaestro from "../middlewares/verificar-perfil-maestro";
const RotasMaestro = Router();
export default RotasMaestro;
RotasMaestro.post("/", ServiçosMaestro.cadastrarMaestro);
RotasMaestro.get(
  "/:cpf",
  verificarToken,
  verificarPerfilMaestro,
  ServiçosMaestro.buscarMaestro
);
