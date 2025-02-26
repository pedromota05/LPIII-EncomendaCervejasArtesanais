import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";

import ContextoUsuário from "../../contextos/contexto-usuário";
import {
  serviçoCadastrarCriador,
  serviçoBuscarCriador,
} from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarDropdown,
  estilizarCardCriador,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarCriador() {
  const referênciaToast = useRef(null);
  const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
  const [dados, setDados] = useState({
    pais_origem: "",
    ano_fundação: "",
    estilo_cerveja_especializado: "",
  });
  const [erros, setErros] = useState({});
  const [cpfExistente, setCpfExistente] = useState(false);
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    const valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    let errosCamposObrigatórios;
    errosCamposObrigatórios = validarCamposObrigatórios(dados);
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function títuloFormulário() {
    if (usuárioLogado?.cadastrado) return "Consultar Criador";
    else return "Cadastrar Criador";
  }

  async function cadastrarCriador() {
    if (validarCampos()) {
      try {
        const response = await serviçoCadastrarCriador({
          ...dados,
          usuário_info: usuárioLogado,
          pais_origem: dados.pais_origem,
          ano_fundação: dados.ano_fundação,
          estilo_cerveja_especializado: dados.estilo_cerveja_especializado,
        });

        if (response.data)
          setUsuárioLogado((usuário) => ({
            ...usuário,
            status: response.data.status,
            token: response.data.token,
          }));

        mostrarToast(
          referênciaToast,
          "Criador cadastrado com sucesso!",
          "sucesso"
        );
      } catch (error) {
        setCpfExistente(true);
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
      }
    }
  }

  function labelBotãoSalvar() {
    if (usuárioLogado?.cadastrado) return "Consultar";
    else return "Cadastrar";
  }

  function açãoBotãoSalvar() {
    if (!usuárioLogado?.cadastrado) cadastrarCriador();
  }

  function redirecionar() {
    if (cpfExistente) {
      setUsuárioLogado(null);
      navegar("/criar-usuario");
    } else {
      setUsuárioLogado((usuárioLogado) => ({
        ...usuárioLogado,
        cadastrado: true,
      }));
      navegar("/pagina-inicial");
    }
  }

  useEffect(() => {
    let desmontado = false;
    async function buscarDadosCriador() {
      try {
        const response = await serviçoBuscarCriador(usuárioLogado.cpf);
        if (!desmontado && response.data) {
          setDados((dados) => ({
            ...dados,
            pais_origem: response.data.pais_origem,
            ano_fundação: response.data.ano_fundação,
            estilo_cerveja_especializado: response.data.estilo_cerveja_especializado,
          }));
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }

    if (usuárioLogado?.cadastrado) buscarDadosCriador();
    return () => (desmontado = true);
  }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);

  return (
    <div className={estilizarCardCriador()} style={{ justifyContent: "center" }}>
      <Toast
        ref={referênciaToast}
        onHide={redirecionar}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className="my_card_criador"
      >
        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            País Origem*:
          </label>
          <InputText
            name="pais_origem"
            className={`border rounded px-2 py-1 ${estilizarDropdown(
              erros.pais_origem,
              usuárioLogado.cor_tema
            )}`}
            style={{ height: "35px" }}
            value={dados.pais_origem}
            onChange={alterarEstado}
          />
        </div>
        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            Anos de Fundação*:
          </label>
          <InputNumber
            name="ano_fundação"
            size={5}
            value={dados.ano_fundação}
            onValueChange={alterarEstado}
            mode="decimal"
            className="border rounded py-1"
            inputClassName={estilizarInputNumber(
              erros.ano_fundação,
              usuárioLogado.cor_tema
            )}
            style={{ height: "35px" }}
            placeholder="Ano Fundação"
          />
          <MostrarMensagemErro mensagem={erros.ano_fundação} />
        </div>
        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            Estilo Cerveja Especializado*:
          </label>
          <InputText
            name="estilo_cerveja_especializado"
            className={`border rounded px-2 py-1 ${estilizarInputNumber(
              erros.estilo_cerveja_especializado,
              usuárioLogado.cor_tema
            )}`}
            style={{ height: "35px" }}
            value={dados.estilo_cerveja_especializado}
            onChange={alterarEstado}
            placeholder="Estilo Cerveja Especializado"
          />
          <MostrarMensagemErro mensagem={erros.estilo_cerveja_especializado} />
        </div>
        <Divider className={estilizarDivider(dados.cor_tema)} />
        <div className={`mt-4 mb-2 ${estilizarInlineFlex()}`}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={redirecionar}
          />
          <Button
            className={estilizarBotão()}
            label={labelBotãoSalvar()}
            onClick={açãoBotãoSalvar}
          />
        </div>
      </Card>
    </div>
  );
}
