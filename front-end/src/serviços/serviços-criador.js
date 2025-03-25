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
