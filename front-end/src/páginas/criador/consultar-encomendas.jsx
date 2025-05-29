import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import { estilizarBotão, estilizarBotãoRetornar, estilizarCard, estilizarCheckbox,
    estilizarDivCampo, estilizarDivider, estilizarFlex, estilizarInlineFlex, estilizarInputText,
    estilizarLabel, estilizarInputNumber } from "../../utilitários/estilos";

export default function ConsultarEncomenda() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { encomendaConsultado, setGerenteEmpórioInteressado } = useContext(ContextoCriador);
    const dados = { 
        nome_gerente_empório: encomendaConsultado?.gerenteEmpório?.usuário?.nome,
        data_encomenda: encomendaConsultado?.data_encomenda ? new Date(encomendaConsultado.data_encomenda).toISOString().split('T')[0] : "",
        valor_total: encomendaConsultado?.valor_total || "",
        quantidade: encomendaConsultado?.quantidade || "",
        nome_cerveja_artesanal: encomendaConsultado?.cervejaArtesanal?.nome
    };
    const navegar = useNavigate();
    function retornarPesquisarEncomendas() { navegar("../pesquisar-encomendas"); };
    function consultarGerenteEmpórioInteressado() {
        setGerenteEmpórioInteressado(encomendaConsultado.gerenteEmpório);
        navegar("../consultar-gerente-emporio-interessado");
    };
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
            }}
        >
            <Card title="Consultar Encomenda" className="my_card_criador">
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Gerente Empório*:</label>
                    <InputText name="nome_gerente_empório"
                    className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
                    value={dados.nome_gerente_empório} style={{ height: "35px" }} disabled/>
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Data da Encomenda*:
                    </label>
                    <InputText name="data_encomenda" type="date" value={dados.data_encomenda}
                        className={`border rounded px-2 py-1 ${estilizarInputText(usuárioLogado.cor_tema)}`}	
                        style={{ height: "35px" }} disabled/>
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Valor Total*:
                    </label>
                    <InputNumber
                        name="valor_total"
                        value={dados.valor_total}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        className={`border rounded ${estilizarInputNumber(
                            usuárioLogado.cor_tema
                        )}`}
                        style={{ height: "35px" }}
                        disabled
                    />
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Quantidade*:
                    </label>
                    <InputNumber
                        name="quantidade"
                        value={dados.quantidade}
                        className={`border rounded ${estilizarInputNumber(usuárioLogado.cor_tema)}`}
                        style={{ height: "35px" }}
                        disabled
                    />
                </div>
                
                <Divider className={estilizarDivider()}/>
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                    onClick={retornarPesquisarEncomendas}/>
                    <Button className={estilizarBotão()} label="Gerente Empório" onClick={consultarGerenteEmpórioInteressado}/>
                </div>
            </Card>
        </div>
    );
}