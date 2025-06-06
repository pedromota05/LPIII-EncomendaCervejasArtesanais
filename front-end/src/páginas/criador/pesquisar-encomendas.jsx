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
import ContextoCriador from "../../contextos/contexto-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import { serviçoBuscarEncomendasCervejaArtesanal } from "../../serviços/serviços-criador";
import { TAMANHOS, estilizarBotãoRetornar, estilizarBotãoTabela, estilizarCard,
    estilizarColumnHeader, estilizarColunaConsultar, estilizarDataTable, estilizarDataTablePaginator,
    estilizarDivider, estilizarFilterMenu, estilizarTriStateCheckbox }
    from "../../utilitários/estilos";

export default function PesquisarEncomendas() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { encomendaConsultado, setEncomendaConsultado, cervejaArtesanalConsultada } = useContext(ContextoCriador);
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

    function retornarCadastrarCervejaArtesanal() {
        setEncomendaConsultado(null);
        navegar("../cadastrar-cervejas-artesanais");
    };

    function ConsultarTemplate(encomenda) {
        return (
            <Button icon="pi pi-search"
                className={estilizarBotãoTabela(usuárioLogado.cor_tema,
                encomendaConsultado?.id === encomenda.id)}
                tooltip="Consultar encomenda" tooltipOptions={{ position: 'top' }}
                onClick={() => {
                    setEncomendaConsultado(encomenda);
                    navegar("../consultar-encomenda");
                }}
            />
        );
    };

    function DropdownCategoriaTemplate(opções) {
        function alterarFiltroDropdown(event) {
            return opções.filterCallback(event.value, opções.index);
        };
        return <Dropdown value={opções.value} options={opçõesCategoria} placeholder="Selecione"
            onChange={alterarFiltroDropdown} showClear />;
    };

    function BooleanBodyTemplate(encomenda) {
        if (encomenda.nota_fiscal_emitida) return "Sim";
        else return "Não";
    };
    
    function BooleanFilterTemplate(opções) {
        function alterarFiltroTriState(event) { return opções.filterCallback(event.value); };
        return (
            <div>
                <label>Nota Fiscal Emitida:</label>
                <TriStateCheckbox
                className={estilizarTriStateCheckbox(usuárioLogado?.cor_tema)} value={opções.value}
                onChange={alterarFiltroTriState}/>
            </div>
        );
    };

    useEffect(() => {
        let desmontado = false;
        async function buscarEncomendasCervejaArtesanal() {
            try {
                const response = await serviçoBuscarEncomendasCervejaArtesanal(cervejaArtesanalConsultada?.id);
                if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].label && response.data[0].value) {
                    console.warn("O serviço está retornando opções de categoria, não encomendas. Verifique o serviçoBuscarEncomendasCervejaArtesanal ou o backend.");
                }
                if (!desmontado && response.data) setListaEncomendas(response.data);
            } catch (error) { mostrarToast(referênciaToast, error.response.data.erro, "error"); }
        };
        buscarEncomendasCervejaArtesanal();
        return () => desmontado = true;
    }, [cervejaArtesanalConsultada?.id]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
            <Toast ref={referênciaToast} position="bottom-center"/>
            <Card title="Encomendas Cadastrados" className={estilizarCard(usuárioLogado.cor_tema)}>
                <DataTable dataKey="id" size="small" paginator rows={TAMANHOS.MAX_LINHAS_TABELA}
                emptyMessage="Nenhum interesse encontrado." value={listaEncomendas}
                responsiveLayout="scroll" breakpoint="490px" removableSort
                className={estilizarDataTable()}
                paginatorClassName={estilizarDataTablePaginator(usuárioLogado.cor_tema)}>
                    <Column bodyClassName={estilizarColunaConsultar()} body={ConsultarTemplate}
                    headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}/>
                    <Column field="gerenteEmpório.usuário.nome" header="Gerente Empório" filter showFilterOperator={false}
                    headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column field="cervejaArtesanal.nome" header="Cerveja Artesanal" filter showFilterOperator={false}
                    headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                    <Column headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                    field="cervejaArtesanal.categoria" header="Categoria" filter filterMatchMode="equals"
                    filterElement={DropdownCategoriaTemplate} showClearButton={false}
                    showFilterOperator={false} showFilterMatchModes={false}
                    filterMenuClassName={estilizarFilterMenu()} showFilterMenuOptions={false} sortable />
                    <Column
                        field="quantidade"
                        header="Quantidade"
                        filter
                        showFilterOperator={false}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)}
                        sortable
                    />
                    <Column field="nota_fiscal_emitida" header="Nota Fiscal Emitida" dataType="boolean" filter showFilterOperator={false}
                        body={BooleanBodyTemplate} filterElement={BooleanFilterTemplate}
                        filterMatchMode="equals" showClearButton={false} showAddButton={false}
                        filterMenuClassName={estilizarFilterMenu()}
                        headerClassName={estilizarColumnHeader(usuárioLogado.cor_tema)} sortable/>
                </DataTable>
                <Divider className={estilizarDivider()}/>
                <Button className={estilizarBotãoRetornar()} label="Retornar"
                onClick={retornarCadastrarCervejaArtesanal}/>
            </Card>
        </div>
    );
}