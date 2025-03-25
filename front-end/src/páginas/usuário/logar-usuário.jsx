import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";

import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoLogarUsuário } from "../../serviços/serviços-usuário";
import mostrarToast from "../../utilitários/mostrar-toast";
import { CPF_MÁSCARA } from "../../utilitários/máscaras";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";

import {
  TAMANHOS,
  estilizarBotão,
  estilizarCard,
  estilizarDivCampo,
  estilizarFlex,
  estilizarInputMask,
  estilizarLabel,
  estilizarLink,
  estilizarLogo,
  estilizarPasswordInput,
  estilizarPasswordTextInputBorder,
  estilizarPáginaÚnica,
} from "../../utilitários/estilos";

export default function LogarUsuário() {
  const referênciaToast = useRef(null);
  const { setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({ nome_login: "", senha: "" });
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function validarCampos() {
    const erros = validarCamposObrigatórios(dados);
    setErros(erros);
    return checarListaVazia(erros);
  }

  async function logarUsuário() {
    if (validarCampos()) {
      try {
        const response = await serviçoLogarUsuário(dados);
        setUsuárioLogado({
          ...response.data?.usuárioLogado,
          cpf: dados.nome_login,
          cadastrado: true,
        });
        navegar("/pagina-inicial");
      } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "error");
      }
    }
  }

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      logarUsuário();
    }
  }

  return (
    <div className={estilizarPáginaÚnica()} onKeyDown={handleKeyDown}>
      <Toast ref={referênciaToast} position="bottom-center" />
      <h1 className={estilizarLogo()}>Encomenda de Cervejas Artesanais</h1>
      <Card title="Login" className="my_card">
        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className="mb-1 font-bold">Usuário</label>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputMask
              name="nome_login"
              size={TAMANHOS.CPF}
              className={`${estilizarInputMask(erros.nome_login)} border rounded px-2 py-1`}
              autoClear
              mask={CPF_MÁSCARA}
              value={dados.nome_login}
              onChange={alterarEstado}
            />
            <MostrarMensagemErro mensagem={erros.nome_login} />
          </div>
        </div>
        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className="mb-1 font-bold">Senha</label>
          <Password
            name="senha"
            inputClassName={`${estilizarPasswordTextInputBorder()} w-full`}
            className={`${estilizarPasswordInput(erros.senha)} border rounded py-1 w-full`}
            size={TAMANHOS.SENHA}
            value={dados.senha}
            feedback={false}
            toggleMask
            onChange={alterarEstado}
          />
          <MostrarMensagemErro mensagem={erros.senha} />
        </div>
        <div className={estilizarFlex("center")}>
          <Button
            className="button-form-login w-full"
            label="Login"
            onClick={logarUsuário}
          />
          <Link className="w-full btn-recupe-acesso mt-2" to="/recuperar-acesso">
            Recuperar Acesso de Usuário?
          </Link>
          <div className="w-full my-5 text-center">
            <span>Não tem uma conta?</span>
            <Link className="ml-1" style={{color: "#26a69a"}} to="/criar-usuario">
              Cadastrar Usuário
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
