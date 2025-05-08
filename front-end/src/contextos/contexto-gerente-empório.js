import { createContext, useState } from "react";
const ContextoGerenteEmpório = createContext();
export default ContextoGerenteEmpório;
export function ProvedorGerenteEmpório({ children }) {
    const [encomendaConsultado, setEncomendaConsultado] = useState({});
    const [cervejaArtesanalConsultada, setCervejaArtesanalConsultada] = useState({});
    const [cervejaArtesanalSelecionada, setCervejaArtesanalSelecionada] = useState({});
    const [cervejaArtesanalEncomenda, setCervejaArtesanalEncomenda] = useState({});
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
        }}
        >
        {children}
        </ContextoGerenteEmpório.Provider>
    );
}