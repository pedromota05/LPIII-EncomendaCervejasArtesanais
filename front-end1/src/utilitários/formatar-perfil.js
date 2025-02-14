export default function formatarPerfil(perfil) {
  switch (perfil) {
    case "maestro":
      return "Maestro";
    case "empresário":
      return "Empresário";
    default:
      return;
  }
}
