import servidor from "./servidor";

export function serviçoCadastrarGerenteEmpório(gerenteEmpório) {
return servidor.post("/gerentes-emporios", gerenteEmpório);
}

export function serviçoAtualizarGerenteEmpório(gerenteEmpório) {
return servidor.patch("/gerentes-emporios", gerenteEmpório);
}

export function serviçoBuscarGerenteEmpório(cpf) {
    return servidor.get(`/gerentes-emporios/${cpf}`);
}