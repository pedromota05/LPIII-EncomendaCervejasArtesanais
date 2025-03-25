import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuário from "../../contextos/contexto-usuário";
import { ANO_MÁSCARA, TELEFONE_MÁSCARA } from "../../utilitários/máscaras";
import {
    serviçoAtualizarGerenteEmpório,
    serviçoCadastrarGerenteEmpório,
    serviçoBuscarGerenteEmpório,
} from "../../serviços/serviços-gerente-empório";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
    MostrarMensagemErro,
    checarListaVazia,
    validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
    TAMANHOS,
    estilizarBotão,
    estilizarBotãoRetornar,
    estilizarCard,
    estilizarDivCampo,
    estilizarDivider,
    estilizarDropdown,
    estilizarCardCriador,
    estilizarFlex,
    estilizarInlineFlex,
    estilizarInputMask,
    estilizarInputText,
    estilizarLabel,
} from "../../utilitários/estilos";

export default function CadastrarGerenteEmpório() {
    const referênciaToast = useRef(null);
    const { usuárioLogado, setUsuárioLogado } = useContext(ContextoUsuário);
    const [dados, setDados] = useState({
        telefone: "",
        localização_pais: "",
        nível_experiência: "",
    });
    const [erros, setErros] = useState({});
    const [cpfExistente, setCpfExistente] = useState(false);
    const navegar = useNavigate();
    const opçõesNívelExperiência = [{ label: "Júnior", value: "junior"},
        { label: "Pleno", value: "pleno" },
        { label: "Sênior", value: "senior" },
    ];
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
        if (usuárioLogado?.cadastrado) return "Alterar Gerente Empório";
        else return "Cadastrar Gerente Empório";
    }
    async function cadastrarGerenteEmpório() {
        if (validarCampos()) {
        try {
            const response = await serviçoCadastrarGerenteEmpório({
                ...dados,
                usuário_info: usuárioLogado,
                telefone: dados.telefone,
                localização_pais: dados.localização_pais,
                nível_experiência: dados.nível_experiência,
            });
            if (response.data)
            setUsuárioLogado((usuário) => ({
                ...usuário,
                status: response.data.status,
                token: response.data.token,
            }));
            mostrarToast(
                referênciaToast,
                "Gerente Empório cadastrado com sucesso!",
                "sucesso"
            );
        } catch (error) {
            setCpfExistente(true);
            mostrarToast(referênciaToast, error.response.data.erro, "erro");
        }
        }
    }
    async function atualizarGerenteEmpório() {
        if (validarCampos()) {
        try {
            const response = await serviçoAtualizarGerenteEmpório({
            ...dados,
            cpf: usuárioLogado.cpf,
            });
            if (response)
            mostrarToast(
                referênciaToast,
                "Gerente Empório atualizado com sucesso!",
                "sucesso"
            );
        } catch (error) {
            mostrarToast(referênciaToast, error.response.data.erro, "erro");
        }
        }
    }
    function labelBotãoSalvar() {
        if (usuárioLogado?.cadastrado) return "Alterar";
        else return "Cadastrar";
    }
    function açãoBotãoSalvar() {
        if (usuárioLogado?.cadastrado) atualizarGerenteEmpório();
        else cadastrarGerenteEmpório();
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
        async function buscarDadosGerenteEmpório() {
        try {
            const response = await serviçoBuscarGerenteEmpório(usuárioLogado.cpf);
            if (!desmontado && response.data) {
            setDados((dados) => ({
                ...dados,
                telefone: response.data.telefone,
                localização_pais: response.data.localização_pais,
                nível_experiência: response.data.nível_experiência,
            }));
            }
        } catch (error) {
            const erro = error.response.data.erro;
            if (erro) mostrarToast(referênciaToast, erro, "erro");
        }
        }
        if (usuárioLogado?.cadastrado) buscarDadosGerenteEmpório();
        return () => (desmontado = true);
    }, [usuárioLogado?.cadastrado, usuárioLogado.cpf]);
    return (
        <div className={estilizarCardCriador()}>
            <Toast
                ref={referênciaToast}
                onHide={redirecionar}
                position="bottom-center"
            />
            <Card
                title={títuloFormulário()}
                className={estilizarCard(usuárioLogado.cor_tema)}
            >
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(usuárioLogado.cor_tema)}>
                        Telefone*:
                    </label>
                    <InputMask
                        name="telefone"
                        autoClear
                        size={TAMANHOS.TELEFONE}
                        onChange={alterarEstado}
                        className={estilizarInputMask(
                        erros.telefone,
                        usuárioLogado.cor_tema
                        )}
                        mask={TELEFONE_MÁSCARA}
                        value={dados.telefone}
                    />
                    <MostrarMensagemErro mensagem={erros.telefone} />
                </div>

                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>Localização País*:</label>
                    <InputText
                        name="localização_pais"
                        className={estilizarInputText(erros.localização_pais, 400, dados.cor_tema)}
                        value={dados.localização_pais}
                        onChange={alterarEstado}
                    />
                    <MostrarMensagemErro mensagem={erros.localização_pais} />
                </div>

                <div className="flex mb-5" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Nível Experiência*:
                    </label>
                    <Dropdown name="nível_experiência"
                        className={estilizarDropdown(erros.nível_experiência, usuárioLogado.cor_tema)}
                        value={dados.nível_experiência} options={opçõesNívelExperiência} onChange={alterarEstado}
                        placeholder="-- Selecione --"/>
                    <MostrarMensagemErro mensagem={erros.nível_experiência} />
                </div>

                <Divider className={estilizarDivider(dados.cor_tema)} />
                <div className={estilizarInlineFlex()}>
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