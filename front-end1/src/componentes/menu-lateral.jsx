import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";

import ContextoUsuário from "../contextos/contexto-usuário";
import formatarPerfil from "../utilitários/formatar-perfil";
import {
  estilizarBotão,
  estilizarColuna,
  estilizarGridColunaSidebar,
  estilizarGridSidebar,
  estilizarMenu,
  estilizarMenuLateralDesktop,
  estilizarMenuLateralMobile,
  estilizarSidebar,
  estilizarSubtítulo,
  estilizarTítulo,
} from "../utilitários/estilos";

export default function MenuLateral({ children }) {
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(false);
  const tamanhoDesktop = windowWidth > 991;
  const navegar = useNavigate();
  const location = useLocation();

  const opçõesCriador = [
    {
      label: (
        <>
          <i className="pi pi-home" style={{ marginRight: 8 }} />
          Página Inicial
        </>
      ),
      command: () => navegar("/pagina-inicial"),
    },
    {
      label: "Menu",
      items: [
        {
          label: (
            <div style={{ paddingLeft: '25px' }}>
              <i className="pi pi-user" style={{ marginRight: 8 }} />
              Cadastrar Usuário
            </div>
          ),
          command: () => navegar("/atualizar-usuario"),
          disabled: usuárioLogado.status !== "ativo",
        },
        {
          label: (
            <div style={{ paddingLeft: '25px' }}>
              <i className="pi pi-briefcase" style={{ marginRight: 8 }} />
              Cadastrar Criador
            </div>
          ),
          command: () => navegar("/cadastrar-criador"),
        },
      ],
    },
    {label: (<><i className="pi pi-sign-out" style={{ marginRight: 8 }} /> Sair do Sistema</>),
      command: () => sairSistema(),
    },
  ];

  const opçõesEmpório = [];
  function sairSistema() {
    setUsuárioLogado({});
    navegar("/");
  }

  function opçõesMenu() {
    switch (usuárioLogado.perfil) {
      case "criador": return opçõesCriador;
      case "empório": return opçõesEmpório;
      default: return;
    }
  }

  function redimensionarJanela() {
    setWindowWidth(window.innerWidth);
  }

  function MenuServiços() {
    if (tamanhoDesktop) {
      return (
        <div>
          <h1 className={estilizarTítulo(usuárioLogado?.cor_tema)}>
            {usuárioLogado?.nome}
          </h1>
          <h2 className={estilizarSubtítulo(usuárioLogado?.cor_tema)}>
            {formatarPerfil(usuárioLogado?.perfil)}
          </h2>
          <Menu className={estilizarMenu()} model={opçõesMenu()} />
        </div>
      );
    } else
      return (
        <>
          <div className={estilizarMenuLateralMobile(usuárioLogado?.cor_tema)} style={{ height: "60px", display: "flex", alignItems: "center" }}>
            <Button
              className={estilizarBotão(usuárioLogado?.cor_tema)}
              icon="pi pi-bars"
              aria-label="Filter"
              onClick={() => setVisible(true)}
            />
            <div style={{ marginLeft: "10px" }}>
              <h1 className={`mt-3 ${estilizarTítulo(usuárioLogado?.cor_tema)}`}>
                {usuárioLogado?.nome}
              </h1>
              <h2 className={estilizarSubtítulo(usuárioLogado?.cor_tema)} style={{ marginTop: "0" }}>
                {formatarPerfil(usuárioLogado?.perfil)}
              </h2>
            </div>
          </div>
          <Sidebar
            className={estilizarSidebar()}
            visible={visible}
            onHide={() => setVisible(false)}
            showCloseIcon
          >
            <Menu className={estilizarMenu()} model={opçõesMenu()} />
          </Sidebar>
        </>
      );
  }

  useEffect(() => {
    window.addEventListener("resize", redimensionarJanela);
    return () => window.removeEventListener("resize", redimensionarJanela);
  }, []);

  useEffect(() => {
    const { pathname } = location;
    const element = document.querySelector(".w-card-user");

    if (pathname === "/pagina-inicial" || pathname === "/cadastrar-criador") {
      document.body.style.overflowY = "hidden";
    } else if (pathname === "/atualizar-usuario") {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "auto";
    }
    if (element) {
      if (pathname === "/atualizar-usuario") {
        element.style.width = "90%"; // Define a largura diretamente
      } else {
        element.style.width = ""; // Reseta para o valor padrão do CSS
      }
    }
  }, [location]);

  return (
    <div className={estilizarGridSidebar(usuárioLogado?.cor_tema)}>
      <div className={estilizarGridColunaSidebar()}>
        <MenuServiços />
      </div>
      <div className={estilizarColuna()}>{children}</div>
    </div>
  );
}
