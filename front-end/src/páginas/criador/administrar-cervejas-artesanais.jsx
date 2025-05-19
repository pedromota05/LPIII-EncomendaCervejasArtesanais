import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoCriador from "../../contextos/contexto-criador";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { serviçoBuscarCervejasArtesanaisCriador } from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
    TAMANHOS,
    estilizarBotão,
    estilizarBotãoRetornar,
    estilizarBotãoTabela,
    estilizarCard,
    estilizarColunaConsultar,
    estilizarColumnHeader,
    estilizarDataTable,
    estilizarDataTablePaginator,
    estilizarDivider,
    estilizarFilterMenu,
    estilizarFlex,
    estilizarTriStateCheckbox,
} from "../../utilitários/estilos";
 
export default function AdministrarCervejasArtesanais() {
  const referênciaToast = useRef(null);
  const { usuárioLogado } = useContext(ContextoUsuário);
  const { cervejaArtesanalConsultada, setCervejaArtesanalConsultada } = useContext(ContextoCriador);
  const [listaCervejasArtesanais, setListaCervejasArtesanais] = useState([]);
  const navegar = useNavigate();
 
  const opçõesCategoria = [
    { label: "India Pale Ale", value: "indiaPaleAle" },
    { label: "Stout", value: "stout" },
    { label: "Pilsen", value: "pilsen" },
    { label: "Amber Ale", value: "amberAle" },
    { label: "American Pale Ale", value: "americanPaleAle" },
    { label: "Pale Ale", value: "paleAle" },
  ];

  const opçõesDisponibilidade = [
    { label: "Limitada", value: "limitada" },
    { label: "Ano todo", value: "anoTodo" },
  ];
 
  function retornarPáginaInicial() {
    navegar("/pagina-inicial");
  }
 
  function adicionarCervejaArtesanal() {
    setCervejaArtesanalConsultada(null);
    navegar("../cadastrar-cervejas-artesanais");
  }
 
  function ConsultarTemplate(cervejaArtesanal) {
    function consultar() {
      setCervejaArtesanalConsultada(cervejaArtesanal);
      navegar("../cadastrar-cervejas-artesanais");
    }
    return (
      <Button
        icon="pi pi-search"
        className={estilizarBotãoTabela(
          usuárioLogado.cor_tema,
          cervejaArtesanalConsultada?.id === cervejaArtesanal.id
        )}
        tooltip="Consultar Cerveja Artesanal"
        tooltipOptions={{ position: "top" }}
        onClick={consultar}
      />
    );
  }

  function DropdownCategoriaTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    }
    return (
      <Dropdown
        value={opções.value}
        options={opçõesCategoria}
        placeholder="Selecione"
        onChange={alterarFiltroDropdown}
        showClear
      />
    );
  }
 
  function DropdownDisponibilidadeTemplate(opções) {
    function alterarFiltroDropdown(event) {
      return opções.filterCallback(event.value, opções.index);
    }
    return (
      <Dropdown
        value={opções.value}
        options={opçõesDisponibilidade}
        placeholder="Selecione"
        onChange={alterarFiltroDropdown}
        showClear
      />
    );
  }

  function BooleanBodyTemplate(cervejaArtesanal) {
    if (cervejaArtesanal.contem_gluten) return "Sim";
    else return "Não";
  };

  function BooleanFilterTemplate(opções) {
    function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
    return (
      <div>
        <label>Contem Gluten:</label>
        <TriStateCheckbox
        className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
        onChange={alterarFiltroTriState}/>
    </div>
    );
  };
 
  useEffect(() => {
    let desmontado = false;
    async function buscarCervejasArtesanaisCriador() {
      try {
        const response = await serviçoBuscarCervejasArtesanaisCriador(
          usuárioLogado.cpf
        );
        if (!desmontado && response.data) {
          setListaCervejasArtesanais(response.data);
        }
      } catch (error) {
        const erro = error.response.data.erro;
        if (erro) mostrarToast(referênciaToast, erro, "erro");
      }
    }
    buscarCervejasArtesanaisCriador();
    return () => (desmontado = true);
  }, [usuárioLogado.cpf]);
 
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <Card
        title="Administrar Cervejas Artesanais"
        className={estilizarCard(usuárioLogado.cor_tema)}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <DataTable
          dataKey="id"
          size="small"
          paginator
          rows={TAMANHOS.MAX_LINHAS_TABELA}
          emptyMessage="Nenhuma cerveja artesanal encontrada."
          value={listaCervejasArtesanais}
          responsiveLayout="scroll"
          breakpoint="490px"
          removableSort
          className={estilizarDataTable()}
          paginatorClassName={estilizarDataTablePaginator(
            usuárioLogado.cor_tema
          )}
        >
          <Column
            bodyClassName={estilizarColunaConsultar()}
            body={ConsultarTemplate}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
          />
          <Column
            field="nome"
            header="Nome"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            field="teor_alcoolico"
            header="Teor Alcoólico (%)"
            filter
            showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            sortable
          />
          <Column
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="categoria"
            header="Categoria"
            filter
            filterMatchMode="equals"
            filterElement={DropdownCategoriaTemplate}
            showClearButton={false}
            showFilterOperator={false}
            showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()}
            showFilterMenuOptions={false}
            sortable
          />
          <Column
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
            field="disponibilidade"
            header="Disponibilidade"
            filter
            filterMatchMode="equals"
            filterElement={DropdownDisponibilidadeTemplate}
            showClearButton={false}
            showFilterOperator={false}
            showFilterMatchModes={false}
            filterMenuClassName={estilizarFilterMenu()}
            showFilterMenuOptions={false}
            sortable
          />
          <Column field="contem_gluten" header="Contem Gluten" filter showFilterOperator={false}
            headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable
            filterMatchMode="equals" filterElement={BooleanFilterTemplate}
            body={BooleanBodyTemplate} showClearButton={false} showAddButton={false}
            filterMenuClassName={estilizarFilterMenu()} dataType="boolean"/>
        </DataTable>
        <Divider className={estilizarDivider()} />
        <Button
          className={estilizarBotãoRetornar()}
          label="Retornar"
          onClick={retornarPáginaInicial}
        />
        <Button
          className={estilizarBotão()}
          label="Adicionar"
          onClick={adicionarCervejaArtesanal}
        />
      </Card>
    </div>
  );
}