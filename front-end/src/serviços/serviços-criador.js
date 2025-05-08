import servidor from "./servidor";

export function serviçoCadastrarCriador(criador) {
  return servidor.post("/criadores", criador);
}

export function serviçoBuscarCriador(cpf) {
  return servidor.get(`/criadores/${cpf}`);
}

export function serviçoAtualizarCriador(criador) {
  return servidor.patch("/criadores", criador);
}

export function serviçoCadastrarCervejaArtesanal(cervejaArtesanal) {
  return servidor.post("/criadores/cervejas-artesanais", cervejaArtesanal);
}

export function serviçoAlterarCervejaArtesanal(cervejaArtesanal) {
  return servidor.patch("/criadores/cervejas-artesanais", cervejaArtesanal);
}

export function serviçoRemoverCervejaArtesanal(id) {
  return servidor.delete(`/criadores/cervejas-artesanais/${id}`);
}

export function serviçoBuscarCervejasArtesanaisCriador(cpf) {
  return servidor.get(`/criadores/cervejas-artesanais/criador/${cpf}`);
}

export function serviçoBuscarEncomendasCervejasArtesanais() {
  return servidor.get("/criadores/cervejas-artesanais/encomendas");
}
