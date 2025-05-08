import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilGerenteEmpório from "../middlewares/verificar-perfil-gerente-empório";
import ServiçosGerenteEmpório from "../serviços/serviços-gerente-empório";
import verificarErroConteúdoToken from "../middlewares/verificar-erro-conteúdo-token";

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

RotasGerenteEmpório.post(
   "/encomendas/",
   verificarToken,
   verificarPerfilGerenteEmpório,
   ServiçosGerenteEmpório.cadastrarEncomenda
);

RotasGerenteEmpório.delete(
   "/encomendas/:id",
   verificarToken,
   verificarPerfilGerenteEmpório,
   ServiçosGerenteEmpório.removerEncomenda
);

RotasGerenteEmpório.get(
   "/encomendas/gerente-emporio/:cpf",
   verificarToken,
   verificarPerfilGerenteEmpório,
   verificarErroConteúdoToken,
   ServiçosGerenteEmpório.buscarEncomendasGerenteEmpório
);

RotasGerenteEmpório.get(
   "/encomendas/cervejas-artesanais/",
   verificarToken,
   verificarPerfilGerenteEmpório,
   ServiçosGerenteEmpório.buscarCervejasArtesanais
);