import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsuárioContext from "../contextos/contexto-usuário";
export default function RotasGerenteEmpório() {
    const { usuárioLogado } = useContext(UsuárioContext);
    if (usuárioLogado.perfil === "gerenteEmpório") return <Outlet />;
    else return <Navigate to="/" />;
}