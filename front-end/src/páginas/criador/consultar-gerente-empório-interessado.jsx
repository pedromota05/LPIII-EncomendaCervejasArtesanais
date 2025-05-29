import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import { TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {TAMANHOS, estilizarBotãoRetornar, estilizarDivider,
        estilizarInlineFlex, estilizarInputText, estilizarLabel }
    from "../../utilitários/estilos";

export default function ConsultarGerenteEmpório() {
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { gerenteEmpórioInteressado } = useContext(ContextoCriador);
    const dados = { 
        nome: gerenteEmpórioInteressado?.usuário?.nome, 
        telefone: gerenteEmpórioInteressado?.telefone,
        localização_pais: gerenteEmpórioInteressado?.localização_pais,
        nível_experiência: gerenteEmpórioInteressado?.nível_experiência,
    };
    const navegar = useNavigate();
    function retornarConsultarEncomenda() { navegar("../consultar-encomenda"); };
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh',
            }}
        >
            <Card title="Consultar Gerente Empório" className="my_card_criador">
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Nome*:</label>
                    <InputText name="nome" className={`border rounded py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
                        value={dados.nome} disabled />
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Telefone*:</label>
                    <InputMask name="telefone" autoClear size={TAMANHOS.TELEFONE} mask={TELEFONE_MÁSCARA}
                    className={estilizarInputText(usuárioLogado.cor_tema)} value={dados.telefone}  style={{ height: "35px" }} disabled/>
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>Localização País*:</label>
                    <InputText
                        name="localização_pais"
                        className={`border rounded py-1 ${estilizarInputText(usuárioLogado.cor_tema)}`}
                        value={dados.localização_pais}
                        style={{ height: "35px" }}
                        disabled
                    />
                </div>
                <div className="flex mb-3" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Nível Experiência*:
                    </label>
                    <InputText
                        name="nível_experiência"
                        className={`border rounded px-2 py-1 ${estilizarInputText(usuárioLogado.cor_tema)}`}
                        style={{ height: "35px" }}
                        value={dados.nível_experiência}
                        disabled
                    />
                </div>
                <Divider className={estilizarDivider(dados.cor_tema)} />
                <div className={estilizarInlineFlex()}>
                    <Button className={estilizarBotãoRetornar()} label="Retornar"
                        onClick={retornarConsultarEncomenda} />
                </div>
            </Card>
        </div>
    );
}