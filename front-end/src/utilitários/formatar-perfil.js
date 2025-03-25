export default function formatarPerfil(perfil) {
  switch (perfil) {
    case "criador":
      return "Criador";
    case "gerenteEmpório":
      return "Gerente Empório";
    default:
      return;
  }
}
