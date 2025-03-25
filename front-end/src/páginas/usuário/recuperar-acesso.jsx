import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ModalRecuperarAcesso from "../../componentes/modais/modal-recuperar-acesso";
import mostrarToast from "../../utilitários/mostrar-toast";
import { CPF_MÁSCARA } from "../../utilitários/máscaras";
import {
    serviçoBuscarQuestãoSegurança,
    serviçoVerificarRespostaCorreta,
} from "../../serviços/serviços-usuário";
import {
    MostrarMensagemErro,
    checarListaVazia,
    validarCamposObrigatórios,
    validarCpf,
} from "../../utilitários/validações";
import {
    TAMANHOS,
    estilizarBotão,
    estilizarCard,
    estilizarDialog,
    estilizarDivCampo,
    estilizarFlex,
    estilizarFooterDialog,
    estilizarInputMask,
    estilizarInputText,
    estilizarLabel,
    estilizarLink,
    estilizarParágrafo,
    estilizarPáginaÚnica,
} from "../../utilitários/estilos";

export default function RecuperarAcesso() {
    const referênciaToast = useRef(null);
    const { setCpfVerificado, setNovaSenha, setTokenRecuperação } = useContext(ContextoUsuário);
    const [dados, setDados] = useState({
        cpf: "",
        questão: "",
        resposta: "",
        token: "",
    });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [desabilitar, setDesabilitar] = useState(true);
    const [timer, setTimer] = useState(null);
    const [erros, setErros] = useState({});
    function alterarEstado(event) {
        const chave = event.target.name || event.value;
        const valor = event.target.value;
        setDados({ ...dados, [chave]: valor });
    }
    function validarCampos() {
        let errosCamposObrigatórios = validarCamposObrigatórios({
            resposta: dados.resposta,
        });
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    }
    function esconderModal() {
        setNovaSenha({});
        setMostrarModal(false);
    }
    async function buscarQuestãoSegurança(event) {
        const cpf = event.target.value;
        setDados({ ...dados, cpf });
        clearTimeout(timer);
        const novoTimer = setTimeout(async () => {
        try {
            if (validarCpf(event.target.value)) {
            const response = await serviçoBuscarQuestãoSegurança(cpf);
            setDesabilitar(false);
            setDados({ ...dados, cpf, questão: response.data.questão });
            }
        } catch (error) {
            mostrarToast(referênciaToast, error.response.data.mensagem, "erro");
            setDados({ ...dados, questão: "" });
        }
        }, 1500);
        setTimer(novoTimer);
    }
    async function verificarRespostaCorreta() {
        try {
            const cpf = dados.cpf;
            const response = await serviçoVerificarRespostaCorreta({
                cpf,
                resposta: dados.resposta,
            });
            setCpfVerificado(cpf);
            setTokenRecuperação(response.data.token);
            setMostrarModal(true);
        } catch (error) {
            mostrarToast(referênciaToast, error.response.data.mensagem, "erro");
        }
    }
    async function validarConfirmarRecuperaçãoAcesso() {
        if (validarCampos()) {
            await verificarRespostaCorreta();
        }
    }
    return (
        <div className={estilizarPáginaÚnica()}>
            <Toast ref={referênciaToast} position="bottom-center" />
            <Dialog
                visible={mostrarModal}
                className={estilizarDialog()}
                header="Digite sua nova senha e confirme"
                onHide={esconderModal}
                footer={<div className={estilizarFooterDialog()}></div>}
            >
                <ModalRecuperarAcesso />
            </Dialog>
            <Card title="Recuperar Acesso de Usuário" className="my_card">
                <p className={estilizarParágrafo()}>
                    {`Para recuperar o acesso à sua conta, forneça as informações abaixo:`}
                </p>
                <div className="input-container">
                    <div className="input-field">
                        <label className={`margin-responsive ${estilizarLabel()}`}>CPF*:</label>
                        <InputMask
                            name="cpf"
                            className={estilizarInputMask(erros.cpf)}
                            size={TAMANHOS.CPF}
                            mask={CPF_MÁSCARA}
                            autoClear
                            value={dados.cpf}
                            onChange={buscarQuestãoSegurança}
                            style={{ height: "30px", width: "100%" }}
                        />
                    </div>
                </div>
                <div className="input-container mt-3">
                    <div className="input-field">
                        <label className={`margin-responsive ${estilizarLabel()}`}>Questão de segurança*:</label>
                        <InputText
                            name="questão"
                            className={estilizarInputText(erros.questão, 400)}
                            value={dados.questão}
                            disabled
                            style={{ height: "30px", width: "100%" }}
                        />
                    </div>
                </div>
                <div className="input-container mt-3">
                    <div className="input-field">
                        <label className={`margin-responsive ${estilizarLabel()}`}>Resposta*:</label>
                        <InputText
                            name="resposta"
                            className={estilizarInputText(erros.resposta, 350)}
                            disabled={desabilitar}
                            value={dados.resposta}
                            onChange={alterarEstado}
                            style={{ height: "30px", width: "100%" }}
                        />
                        <MostrarMensagemErro mensagem={erros.resposta} />
                    </div>
                </div>
                <div className={`mt-4 ${estilizarFlex()}`}>
                    <Button
                        className="button-confirmacao-cadastro"
                        label="Confirmar"
                        disabled={desabilitar}
                        onClick={validarConfirmarRecuperaçãoAcesso}
                    />
                    <Link
    to="/"
    className={`text-center ${estilizarLink()}`}
    style={{ display: "block", margin: "0 auto" }}
>
    Voltar ao Login
</Link>
                </div>
            </Card>
        </div>
    );
}