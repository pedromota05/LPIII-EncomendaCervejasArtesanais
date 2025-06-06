import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmpório from "../../contextos/contexto-gerente-empório";
import { serviçoBuscarCervejasArtesanais } from "../../serviços/serviços-gerente-empório";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
    TAMANHOS,
    estilizarBotãoRetornar,
    estilizarBotãoTabela,
    estilizarCard,
    estilizarColumnHeader,
    estilizarColunaConsultar,
    estilizarDataTable,
    estilizarDataTablePaginator,
    estilizarDivider,
    estilizarFilterMenu,
    estilizarFlex,
    estilizarTriStateCheckbox,
} from "../../utilitários/estilos";

export default function PesquisarCervejasArtesanais() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const {
        cervejaArtesanalConsultada,
        setCervejaArtesanalConsultada,
        setCervejaArtesanalSelecionada,
    } = useContext(ContextoGerenteEmpório);
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

    function retornarCadastrarEncomenda() {
        setCervejaArtesanalSelecionada(cervejaArtesanalConsultada);
        setCervejaArtesanalConsultada(null);
        navegar("../cadastrar-encomenda");
    }

    function ConsultarTemplate(cervejaArtesanal) {
        return (
        <Button
            icon="pi pi-search"
            className={estilizarBotãoTabela(
                usuárioLogado.cor_tema,
                cervejaArtesanalConsultada?.id === cervejaArtesanal.id
            )}
            tooltip="Consultar Cerveja Artesanal"
            tooltipOptions={{ position: "top" }}
            onClick={() => {
                setCervejaArtesanalConsultada(cervejaArtesanal);
                navegar("../consultar-cerveja-artesanal");
            }}
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
        async function buscarCervejasArtesanais() {
        try {
            const response = await serviçoBuscarCervejasArtesanais();
            if (!desmontado && response.data) setListaCervejasArtesanais(response.data);
        } catch (error) {
            mostrarToast(referênciaToast, error.response.data.erro, "error");
        }
        }
        buscarCervejasArtesanais();
        return () => (desmontado = true);
    }, [usuárioLogado.cpf]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
            <Toast ref={referênciaToast} position="bottom-center" />
            <Card
                title="Pesquisar Cervejas Artesanais"
                className={estilizarCard(usuárioLogado.cor_tema)}
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
                        field="criador.usuário.nome"
                        header="Nome do Criador"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
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
                    <Column field="contem_gluten" header="Contem Gluten" dataType="boolean" filter showFilterOperator={false}
                        body={BooleanBodyTemplate} filterElement={BooleanFilterTemplate}
                        filterMatchMode="equals" showClearButton={false} showAddButton={false}
                        filterMenuClassName={estilizarFilterMenu()}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                </DataTable>
                <Divider className={estilizarDivider()} />
                <Button
                    className={estilizarBotãoRetornar()}
                    label="Retornar"
                    onClick={retornarCadastrarEncomenda}
                />
            </Card>
        </div>
    );
}