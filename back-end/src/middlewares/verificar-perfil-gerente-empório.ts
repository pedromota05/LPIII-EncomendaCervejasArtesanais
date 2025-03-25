import { Perfil } from "../entidades/usuário";
export default function verificarPerfilGerenteEmpório(request, response, next) {
    if (request.perfil === Perfil.GERENTEEMPÓRIO) return next();
    else return response.status(401).json({ erro: "Acesso não autorizado." });
}