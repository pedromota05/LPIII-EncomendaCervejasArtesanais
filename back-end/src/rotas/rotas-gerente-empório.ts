import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteEmpório from "../middlewares/verificar-perfil-gerente-empório";
import ServiçosGerenteEmpório from "../serviços/serviços-gerente-empório";

const RotasGerenteEmpório = Router();
export default RotasGerenteEmpório;

RotasGerenteEmpório.post("/", ServiçosGerenteEmpório.cadastrarGerenteEmpório);
RotasGerenteEmpório.patch(
"/",
    verificarToken,
    verificarPerfilGerenteEmpório,
    ServiçosGerenteEmpório.atualizarGerenteEmpório
);

RotasGerenteEmpório.get(
    "/:cpf",
    verificarToken,
    verificarPerfilGerenteEmpório,
    ServiçosGerenteEmpório.buscarGerenteEmpório
);