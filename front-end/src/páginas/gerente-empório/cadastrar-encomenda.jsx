import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmpório from "../../contextos/contexto-gerente-empório";
import {
  serviçoCadastrarEncomenda,
  serviçoRemoverEncomenda,
} from "../../serviços/serviços-gerente-empório";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
  MostrarMensagemErro,
  checarListaVazia,
  validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
  estilizarBotão,
  estilizarBotãoRetornar,
  estilizarBotãoRemover,
  estilizarCard,
  estilizarDivCampo,
  estilizarDivider,
  estilizarFlex,
  estilizarInlineFlex,
  estilizarInputNumber,
  estilizarInputText,
  estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarEncomenda() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { encomendaConsultado, cervejaArtesanalSelecionada, setCervejaArtesanalEncomenda, setCervejaArtesanalConsultada } = useContext(ContextoGerenteEmpório);
  const [dados, setDados] = useState({
    id_cerveja: cervejaArtesanalSelecionada?.id || "",
    data_encomenda: encomendaConsultado?.data_encomenda ? new Date(encomendaConsultado.data_encomenda).toISOString().split('T')[0] : "",
    valor_total: encomendaConsultado?.valor_total || "",
    quantidade: encomendaConsultado?.quantidade || "",
  });
  
  const [erros, setErros] = useState({});
  const navegar = useNavigate();

  function alterarEstado(event) {
    const chave = event.target.name || event.value;
    let valor = event.target.value;
    setDados({ ...dados, [chave]: valor });
  }

  function validarCampos() {
    const { data_encomenda, valor_total, quantidade } = dados;
    let errosCamposObrigatórios = validarCamposObrigatórios({
      data_encomenda, valor_total, quantidade
    });
    
    if (!cervejaArtesanalSelecionada?.id && !encomendaConsultado?.cervejaArtesanal?.id) {
      errosCamposObrigatórios.cerveja = "Selecione uma cerveja artesanal";
    }
    
    setErros(errosCamposObrigatórios);
    return checarListaVazia(errosCamposObrigatórios);
  }

  function cervejaArtesanalLabel() {
    if (encomendaConsultado?.cervejaArtesanal?.nome || cervejaArtesanalSelecionada)
      return "Cerveja Artesanal Selecionada*:";
    else return "Selecione uma Cerveja Artesanal*:";
  }

  function pesquisarCervejasArtesanais() {
    navegar("../pesquisar-cervejas-artesanais");
  }

  function retornarAdministrarEncomendas() {
    navegar("../administrar-encomendas");
  }

  async function cadastrarEncomendas() {
    if (validarCampos()) {
      try {
        const dadosAjustados = {
          ...dados,
          cpf: usuárioLogado.cpf,
        };

        await serviçoCadastrarEncomenda(dadosAjustados);
        mostrarToast(
          referênciaToast,
          "Encomenda cadastrada com sucesso!",
          "sucesso"
        );
        setTimeout(() => {
          retornarAdministrarEncomendas();
        }, 2000);
      } catch (error) {
        console.error("Erro ao cadastrar encomenda:", error);
        mostrarToast(
          referênciaToast, 
          error.response?.data?.erro || "Erro ao cadastrar encomenda", 
          "erro"
        );
      }
    }
  }

  async function removerEncomenda() {
    try {
      await serviçoRemoverEncomenda(encomendaConsultado.id);
      mostrarToast(
        referênciaToast,
        "Encomenda removida com sucesso!",
        "sucesso"
      );
    } catch (error) {
      mostrarToast(referênciaToast, error.response.data.erro, "erro");
    }
  }

  function BotõesAções() {
    if (encomendaConsultado) {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarEncomendas}
          />
          <Button
            className={estilizarBotãoRemover()}
            label="Remover"
            onClick={removerEncomenda}
          />
          <Button className={estilizarBotão()} label="Cerveja Artesanal" onClick={consultarCervejaArtesanalEncomenda}/>
        </div>
      );
    } else {
      return (
        <div className={estilizarInlineFlex()}>
          <Button
            className={estilizarBotãoRetornar()}
            label="Retornar"
            onClick={retornarAdministrarEncomendas}
          />
          <Button
            className={estilizarBotão()}
            label="Cadastrar"
            onClick={cadastrarEncomendas}
          />
        </div>
      );
    }
  }

  function títuloFormulário() {
    if (encomendaConsultado) return "Remover Encomenda";
    else return "Cadastrar Encomenda";
  }

  function CervejaArtesanalInputText() {
    if (cervejaArtesanalSelecionada?.nome) {
      return (
        <InputText
          name="nome_cervejaArtesanal"
          className={`border rounded ${estilizarInputText(
            erros.nome_cervejaArtesanal,
            usuárioLogado.cor_tema
          )}`}
          value={cervejaArtesanalSelecionada?.nome}
          style={{ height: "35px" }}
          disabled
        />
      );
    } else if (encomendaConsultado?.cervejaArtesanal?.nome) {
      return (
        <InputText
          name="nome_cervejaArtesanal"
          className={`border rounded ${estilizarInputText(
            erros.nome_cervejaArtesanal,
            usuárioLogado.cor_tema
          )}`}
          value={encomendaConsultado?.cervejaArtesanal?.nome}
          style={{ height: "35px" }}
          disabled
        />
      );
    } else return null;
  }

  function BotãoSelecionar() {
    if (!cervejaArtesanalSelecionada && !encomendaConsultado) {
      return (
        <Button
          className={estilizarBotão()}
          label="Selecionar"
          onClick={pesquisarCervejasArtesanais}
        />
      );
    } else if (cervejaArtesanalSelecionada) {
      return (
        <Button
          className={estilizarBotão()}
          label="Substituir"
          onClick={pesquisarCervejasArtesanais}
        />
      );
    } else return null;
  }

  function consultarCervejaArtesanalEncomenda() {
    setCervejaArtesanalConsultada(encomendaConsultado?.cervejaArtesanal || null);
    setCervejaArtesanalEncomenda(encomendaConsultado?.cervejaArtesanal || null);
    navegar("../consultar-cerveja-artesanal");
  };

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Toast
        ref={referênciaToast}
        onHide={retornarAdministrarEncomendas}
        position="bottom-center"
      />
      <Card
        title={títuloFormulário()}
        className="my_card_criador"
      >
        <div>
          <div className="flex align-items-center mb-3">
            <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
              {cervejaArtesanalLabel()}
            </label>
            <BotãoSelecionar />
          </div>
          <div className="flex mt-1 mb-5" style={{ flexDirection: "column" }}>
          <CervejaArtesanalInputText/>
          </div>
          <MostrarMensagemErro mensagem={erros.id_cerveja} />
        </div>

        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            Data da Encomenda*:
          </label>
          <InputText name="data_encomenda" type="date" value={dados.data_encomenda}
            className={`border rounded px-2 py-1 ${estilizarInputText(erros.data_encomenda, usuárioLogado.cor_tema)}`}	
            onChange={alterarEstado}/>
          <MostrarMensagemErro mensagem={erros.data_encomenda} />
        </div>

        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            Valor Total*:
          </label>
          <InputNumber
            name="valor_total"
            value={dados.valor_total}
            onValueChange={alterarEstado}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            className={`border rounded ${estilizarInputNumber(
              erros.valor_total,
              usuárioLogado.cor_tema
            )}`}
            style={{ height: "35px" }}
          />
          <MostrarMensagemErro mensagem={erros.valor_total} />
        </div>

        <div className="flex mb-5" style={{ flexDirection: "column" }}>
          <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
            Quantidade*:
          </label>
          <InputNumber
            name="quantidade"
            value={dados.quantidade}
            onValueChange={(e) => setDados({ ...dados, quantidade: e.value })}
            className={`border rounded ${estilizarInputNumber(erros.quantidade, usuárioLogado.cor_tema)}`}
            style={{ height: "35px" }}
          />
          <MostrarMensagemErro mensagem={erros.quantidade} />
        </div>

        <Divider className={estilizarDivider()} />
        <BotõesAções />
      </Card>
    </div>
  );
}