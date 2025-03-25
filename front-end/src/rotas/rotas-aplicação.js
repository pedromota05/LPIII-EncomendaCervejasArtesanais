import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarCriador from "../páginas/criador/cadastrar-criador";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarGerenteEmpório from "../páginas/gerente-empório/cadastrar-gerente-empório";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogarUsuário />} path="/" />
        <Route element={<CadastrarUsuário />} path="criar-usuario" />
        <Route element={<RecuperarAcesso />} path="recuperar-acesso" />
        <Route element={<RotasUsuárioLogado />}>
          <Route element={<PáginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuário />} path="atualizar-usuario" />
          <Route element={<CadastrarCriador />} path="cadastrar-criador" />
          <Route element={<CadastrarGerenteEmpório />} path="cadastrar-gerente-emporio" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
