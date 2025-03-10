import { Perfil } from "../entidades/usuário";

export default function verificarPerfilCriador(request, response, next) {
  if (request.perfil === Perfil.CRIADOR) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado." });
}
