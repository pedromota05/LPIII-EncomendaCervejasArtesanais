import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuárioLogado from "./rotas-usuário-logado";
import LogarUsuário from "../páginas/usuário/logar-usuário";
import CadastrarUsuário from "../páginas/usuário/cadastrar-usuário";
import PáginaInicial from "../páginas/usuário/página-inicial";
import CadastrarCriador from "../páginas/criador/cadastrar-criador";
import RecuperarAcesso from "../páginas/usuário/recuperar-acesso";
import CadastrarGerenteEmpório from "../páginas/gerente-empório/cadastrar-gerente-empório";
import { ProvedorCriador } from "../contextos/contexto-criador";
import { ProvedorGerenteEmpório } from "../contextos/contexto-gerente-empório";
import RotasCriador from "./rotas-criador";
import RotasGerenteEmpório from "./rotas-gerente-empório";
import AdministrarCervejasArtesanais from "../páginas/criador/administrar-cervejas-artesanais";
import CadastrarCervejasArtesanais from "../páginas/criador/cadastrar-cerveja-artesanal";
import AdministrarEncomendas from "../páginas/gerente-empório/administrar-encomendas";
import CadastrarEncomenda from "../páginas/gerente-empório/cadastrar-encomenda";
import PesquisarCervejasArtesanais from "../páginas/gerente-empório/pesquisar-cervejas-artesanais";
import ConsultarCervejaArtesanal from "../páginas/gerente-empório/consultar-cerveja-artesanal";

import PesquisarEncomendas from "../páginas/criador/pesquisar-encomendas";
import ConsultarEncomenda from "../páginas/criador/consultar-encomendas";
import ConsultarGerenteEmpório from "../páginas/criador/consultar-gerente-empório-interessado";
import ConsultarCriador from "../páginas/gerente-empório/consultar-criador-proponente";

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
          <Route
            element={
              <ProvedorCriador>
                <RotasCriador />
              </ProvedorCriador>
            }
          >
            <Route element={<CadastrarCriador />} path="cadastrar-criador" />
            <Route
              element={<AdministrarCervejasArtesanais />}
              path="administrar-cervejas-artesanais"
            />
            <Route
              element={<CadastrarCervejasArtesanais />}
              path="cadastrar-cervejas-artesanais"
            />
            <Route element={<PesquisarEncomendas />} path="pesquisar-encomendas" />
            <Route element={<ConsultarEncomenda />} path="consultar-encomenda" />
            <Route element={<ConsultarGerenteEmpório />} path="consultar-gerente-emporio-interessado" />
          </Route>

          <Route
            element={
              <ProvedorGerenteEmpório>
                <RotasGerenteEmpório />
              </ProvedorGerenteEmpório>
            }
          >
            <Route
              element={<CadastrarGerenteEmpório />}
              path="cadastrar-gerente-emporio"
            />
            <Route
              element={<AdministrarEncomendas />}
              path="administrar-encomendas"
            />
            <Route
              element={<CadastrarEncomenda />}
              path="cadastrar-encomenda"
            />
            <Route
              element={<PesquisarCervejasArtesanais />}
              path="pesquisar-cervejas-artesanais"
            />
            <Route
              element={<ConsultarCervejaArtesanal />}
              path="consultar-cerveja-artesanal"
            />
            <Route element={<ConsultarCriador/>} path="consultar-criador-proponente"/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
