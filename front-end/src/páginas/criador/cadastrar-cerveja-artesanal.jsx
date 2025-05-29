import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoCriador from "../../contextos/contexto-criador";
import ContextoGerenteEmpório from "../../contextos/contexto-gerente-empório";
import {
    serviçoAlterarCervejaArtesanal,
    serviçoCadastrarCervejaArtesanal,
    serviçoRemoverCervejaArtesanal,
    serviçoBuscarEncomendasCervejasArtesanais,
} from "../../serviços/serviços-criador";
import mostrarToast from "../../utilitários/mostrar-toast";
import {
    MostrarMensagemErro,
    checarListaVazia,
    validarCamposObrigatórios,
} from "../../utilitários/validações";
import {
    estilizarBotão,
    estilizarBotãoRemover,
    estilizarBotãoRetornar,
    estilizarCard,
    estilizarDivCampo,
    estilizarDivider,
    estilizarDropdown,
    estilizarFlex,
    estilizarInlineFlex,
    estilizarInputText,
    estilizarInputNumber,
    estilizarLabel,
    estilizarCheckbox,
} from "../../utilitários/estilos";
 
export default function CadastrarCervejaArtesanal() {
    const referênciaToast = useRef(null);
    const { usuárioLogado } = useContext(ContextoUsuário);
    const { cervejaArtesanalConsultada } = useContext(ContextoCriador);
    const {
        cervejaArtesanalEncomenda,
        setCriadorProponente
    } = useContext(ContextoGerenteEmpório) || {};
    const [dados, setDados] = useState({
        nome: cervejaArtesanalConsultada?.nome || "",
        teor_alcoolico: cervejaArtesanalConsultada?.teor_alcoolico || "",
        categoria: cervejaArtesanalConsultada?.categoria || "",
        disponibilidade: cervejaArtesanalConsultada?.disponibilidade || "",
        contem_gluten: cervejaArtesanalConsultada?.contem_gluten || "",
    });
    const [listaCategorias, setListaCategorias] = useState([]);
    const [erros, setErros] = useState({});
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
 
    function alterarEstado(event) {
        const chave = event.target.name || event.value;
        let valor = event.target.value || event.checked;
        setDados({ ...dados, [chave]: valor });
    }
 
    function validarCampos() {
        const { nome, teor_alcoolico, categoria, disponibilidade } = dados;
        let errosCamposObrigatórios = validarCamposObrigatórios({
            nome,
            teor_alcoolico,
            categoria,
            disponibilidade,
        });
        setErros(errosCamposObrigatórios);
        return checarListaVazia(errosCamposObrigatórios);
    }
 
    function retornarAdministrarCervejasArtesanais() {
        navegar("../administrar-cervejas-artesanais");
    }
 
    async function cadastrarCervejaArtesanal() {
        if (validarCampos()) {
            try {
                const dadosAjustados = {
                    ...dados,
                    cpf: usuárioLogado.cpf,
                };
        
                await serviçoCadastrarCervejaArtesanal(dadosAjustados);
                mostrarToast(
                    referênciaToast,
                    "Cerveja Artesanal cadastrada com sucesso!",
                    "sucesso"
                );
            } catch (error) {
                console.log(error);
                mostrarToast(referênciaToast, error.response.data.erro, "erro", error);
            }
        }
    }
 
    async function alterarCervejaArtesanal() {
        if (validarCampos()) {
            try {
                const dadosAjustados = {
                    ...dados,
                    id: cervejaArtesanalConsultada.id,
                    cpf: usuárioLogado.cpf,
                };
          
                await serviçoAlterarCervejaArtesanal(dadosAjustados);
                mostrarToast(
                    referênciaToast,
                    "Cerveja Artesanal alterada com sucesso!",
                    "sucesso"
                );
            } catch (error) {
                mostrarToast(referênciaToast, error.response.data.erro, "erro");
            }
        }
    }
 
    async function removerCervejaArtesanal() {
        try {
        await serviçoRemoverCervejaArtesanal(cervejaArtesanalConsultada.id);
        mostrarToast(
            referênciaToast,
            "Cerveja Artesanal excluída com sucesso!",
            "sucesso"
        );
        } catch (error) {
        mostrarToast(referênciaToast, error.response.data.erro, "erro");
        }
    }
    
    function BotõesAções() {
        if (cervejaArtesanalConsultada) {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button
                        className={estilizarBotãoRetornar()}
                        label="Retornar"
                        onClick={retornarAdministrarCervejasArtesanais}
                    />
                    <Button
                        className={estilizarBotãoRemover()}
                        label="Remover"
                        onClick={removerCervejaArtesanal}
                    />
                    <Button
                        className={estilizarBotão()}
                        label="Alterar"
                        onClick={alterarCervejaArtesanal}
                    />
                    <Button className={estilizarBotão()} label="Encomendas" onClick={mostrarEncomendas}/>
                </div>
            );
        } else {
            return (
                <div className={estilizarInlineFlex()}>
                    <Button
                        className={estilizarBotãoRetornar()}
                        label="Retornar"
                        onClick={retornarAdministrarCervejasArtesanais}
                    />
                    <Button
                        className={estilizarBotão()}
                        label="Cadastrar"
                        onClick={cadastrarCervejaArtesanal}
                    />
                </div>
            );
        }
    }
 
    function títuloFormulário() {
        if (cervejaArtesanalConsultada) return "Alterar Cerveja Artesanal";
        else return "Cadastrar Cerveja Artesanal";
    }
 
    useEffect(() => {
        async function buscarCategoriasCervejasArtesanais() {
            try {
                const response = await serviçoBuscarEncomendasCervejasArtesanais();
                if (response.data) setListaCategorias(response.data);
            } catch (error) {
                const erro = error.response.data.erro;
                if (erro) mostrarToast(referênciaToast, erro, "erro");
            }
        }
        buscarCategoriasCervejasArtesanais();
    }, []);

    function mostrarEncomendas() { navegar("../pesquisar-encomendas"); };
 
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
                onHide={retornarAdministrarCervejasArtesanais}
                position="bottom-center"
            />
            <Card
                title={títuloFormulário()}
                className="my_card_criador"
            >
                <div className="flex mb-5" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Nome*:
                    </label>
                    <InputText
                        name="nome"
                        className={`border rounded px-2 py-1 ${estilizarInputText(
                        erros.nome,
                        usuárioLogado.cor_tema
                        )}`}
                        value={dados.nome}
                        style={{ height: "35px" }}
                        onChange={alterarEstado}
                    />
                    <MostrarMensagemErro mensagem={erros.nome} />
                </div>
        
                <div className="flex mb-5" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Teor Alcoólico (%)*:
                    </label>
                    <InputNumber
                        name="teor_alcoolico"
                        className={`border rounded ${estilizarInputNumber(
                        erros.teor_alcoolico,
                        usuárioLogado.cor_tema
                        )}`}
                        value={dados.teor_alcoolico}
                        style={{ height: "35px" }}
                        onValueChange={alterarEstado}
                    />
                    <MostrarMensagemErro mensagem={erros.teor_alcoolico} />
                </div>
        
                <div className="flex mb-5" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Categoria*:
                    </label>
                    <Dropdown
                        name="categoria"
                        className={estilizarDropdown(erros.categoria, usuárioLogado.cor_tema)}
                        value={dados.categoria}
                        options={opçõesCategoria}
                        onChange={alterarEstado}
                        placeholder="-- Selecione --"
                    />
                    <MostrarMensagemErro mensagem={erros.categoria} />
                </div>
        
                <div className="flex mb-5" style={{ flexDirection: "column" }}>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Disponibilidade*:
                    </label>
                    <Dropdown
                        name="disponibilidade"
                        className={estilizarDropdown(erros.disponibilidade, usuárioLogado.cor_tema)}
                        value={dados.disponibilidade}
                        options={opçõesDisponibilidade}
                        onChange={alterarEstado}
                        placeholder="-- Selecione --"
                    />
                    <MostrarMensagemErro mensagem={erros.disponibilidade} />
                </div>

                <div>
                    <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
                        Contém Glúten*:
                    </label>
                    <Checkbox name="contem_gluten" checked={dados.contem_gluten}
                    className={estilizarCheckbox()} onChange={alterarEstado} autoResize/>
                </div>
        
                <Divider className={estilizarDivider()} />
                <BotõesAções />
            </Card>
        </div>
    );
}