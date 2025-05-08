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

export function serviçoCadastrarEncomenda(encomenda) {
    return servidor.post("/gerentes-emporios/encomendas", encomenda);
  }
  export function serviçoRemoverEncomenda(id) {
    return servidor.delete(`/gerentes-emporios/encomendas/${id}`);
  }
  export function serviçoBuscarEncomendasGerenteEmpório(cpf) {
    return servidor.get(`/gerentes-emporios/encomendas/gerente-emporio/${cpf}`);
  }
  export function serviçoBuscarCervejasArtesanais() {
    return servidor.get("/gerentes-emporios/encomendas/cervejas-artesanais");
  }