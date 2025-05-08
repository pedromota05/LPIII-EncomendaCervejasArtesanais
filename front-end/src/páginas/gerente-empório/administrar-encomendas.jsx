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
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarEncomendasGerenteEmpório } from "../../serviços/serviços-gerente-empório";
import {
    TAMANHOS,
    estilizarBotão,
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

export default function AdministrarEncomendas() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const {
        encomendaConsultado,
        setEncomendaConsultado,
        setCervejaArtesanalSelecionada,
    } = useContext(ContextoGerenteEmpório);
    const [listaEncomendas, setListaEncomendas] = useState([]);
    const navegar = useNavigate();

    const opçõesCategoria = [
        { label: "India Pale Ale", value: "indiaPaleAle" },
        { label: "Stout", value: "stout" },
        { label: "Pilsen", value: "pilsen" },
        { label: "Amber Ale", value: "amberAle" },
        { label: "American Pale Ale", value: "americanPaleAle" },
        { label: "Pale Ale", value: "paleAle" },
    ];

    function retornarPáginaInicial() {
        navegar("/pagina-inicial");
    }

    function adicionarEncomenda() {
        setEncomendaConsultado(null);
        setCervejaArtesanalSelecionada(null);
        navegar("../cadastrar-encomenda");
    }

    function ConsultarTemplate(encomenda) {
        function consultar() {
            setEncomendaConsultado(encomenda);
            setCervejaArtesanalSelecionada(null);
            navegar("../cadastrar-encomenda");
        }
        return (
            <Button
                icon="pi pi-search"
                className={estilizarBotãoTabela(
                usuárioLogado.cor_tema,
                encomendaConsultado?.id === encomenda.id
                )}
                tooltip="Consultar encomenda"
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

    function formatarData(encomenda) {
        if (encomenda.data_encomenda) {
            return new Date(encomenda.data_encomenda).toLocaleDateString();
        }
        return "";
    }

    function formatarMoeda(encomenda) {
        if (encomenda.valor_total) {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(encomenda.valor_total);
        }
        return "";
    }

    useEffect(() => {
        let desmontado = false;
        async function buscarEncomendasGerenteEmpório() {
            try {
                const response = await serviçoBuscarEncomendasGerenteEmpório(
                usuárioLogado.cpf
                );
                if (!desmontado && response.data) setListaEncomendas(response.data);
            } catch (error) {
                mostrarToast(referênciaToast, error.response.data.erro, "error");
            }
        }
        buscarEncomendasGerenteEmpório();
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
                title="Administrar Encomendas"
                className={estilizarCard(usuárioLogado.cor_tema)}
            >
                <DataTable
                    dataKey="id"
                    size="small"
                    paginator
                    rows={TAMANHOS.MAX_LINHAS_TABELA}
                    emptyMessage="Nenhum encomenda encontrada."
                    value={listaEncomendas}
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
                        field="cervejaArtesanal.criador.usuário.nome"
                        header="Criador"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        field="cervejaArtesanal.nome"
                        header="Nome Cerveja"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        field="cervejaArtesanal.categoria"
                        header="Categoria Cerveja"
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
                        field="quantidade"
                        header="Quantidade"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
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
                    onClick={adicionarEncomenda}
                />
            </Card>
        </div>
    );
}