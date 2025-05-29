import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmpório from "../../contextos/contexto-gerente-empório";
import { estilizarBotãoRetornar, estilizarCard, estilizarDivCampo, estilizarDivider, estilizarFlex,
estilizarInlineFlex, estilizarInputText, estilizarLabel } from "../../utilitários/estilos";

export default function ConsultarCriador() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { criadorProponente } = useContext(ContextoGerenteEmpório);
    const dados = { nome_criador: criadorProponente?.usuário?.nome,
    pais_origem: criadorProponente?.pais_origem,
    ano_fundação: criadorProponente?.ano_fundação,
    estilo_cerveja_especializado: criadorProponente?.estilo_cerveja_especializado };
    const navegar = useNavigate();
    function retornarConsultarCervejaArtesanal() { navegar("/consultar-cerveja-artesanal"); };
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
            }}
        >
            <Card title="Consultar Criador" className="my_card_criador">
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Criador*:</label>
                    <InputText name="nome_criador"
                        className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
                        value={dados.nome_criador} style={{ height: "35px" }} disabled
                    />
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>País Origem*:</label>
                    <InputText name="pais_origem"
                        className={`border rounded px-2 py-1 ${estilizarInputText(null, 150, usuárioLogado.cor_tema)}`}
                        value={dados.pais_origem} autoResize style={{ height: "35px" }} disabled/>
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Ano de Fundação*:</label>
                    <InputNumber name="ano_fundação" size={5}
                        value={dados.ano_fundação}
                        inputClassName={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
                        mode="decimal" style={{ height: "35px" }} disabled/>
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Estilo de Cerveja Especializado*:</label>
                    <InputText name="estilo_cerveja_especializado"
                        className={`border rounded px-2 py-1 ${estilizarInputText(null, 150, usuárioLogado.cor_tema)}`}
                        value={dados.estilo_cerveja_especializado} autoResize style={{ height: "35px" }} disabled/>
                </div>
                <Divider className={estilizarDivider(dados.cor_tema)}/>
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarConsultarCervejaArtesanal}/>
                </div>
            </Card>
        </div>
    );
};