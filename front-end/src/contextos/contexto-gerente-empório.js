import { createContext, useState } from "react";
const ContextoGerenteEmpório = createContext();
export default ContextoGerenteEmpório;
export function ProvedorGerenteEmpório({ children }) {
    const [encomendaConsultado, setEncomendaConsultado] = useState({});
    const [cervejaArtesanalConsultada, setCervejaArtesanalConsultada] = useState({});
    const [cervejaArtesanalSelecionada, setCervejaArtesanalSelecionada] = useState({});
    const [cervejaArtesanalEncomenda, setCervejaArtesanalEncomenda] = useState({});
    const [criadorProponente, setCriadorProponente] = useState({});
    return (
        <ContextoGerenteEmpório.Provider
        value={{
            encomendaConsultado,
            setEncomendaConsultado,
            cervejaArtesanalConsultada,
            setCervejaArtesanalConsultada,
            cervejaArtesanalSelecionada,
            setCervejaArtesanalSelecionada,
            cervejaArtesanalEncomenda,
            setCervejaArtesanalEncomenda,
            criadorProponente,
            setCriadorProponente
        }}
        >
        {children}
        </ContextoGerenteEmpório.Provider>
    );
}