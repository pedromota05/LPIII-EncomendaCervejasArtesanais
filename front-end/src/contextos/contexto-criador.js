import { createContext, useState } from "react";
const ContextoCriador = createContext();
export default ContextoCriador;
export function ProvedorCriador({ children }) {
    const [cervejaArtesanalConsultada, setCervejaArtesanalConsultada] = useState({});
    const [encomendaConsultado, setEncomendaConsultado] = useState(null);
    const [gerenteEmpórioInteressado, setGerenteEmpórioInteressado] = useState(null);
    return (
        <ContextoCriador.Provider
        value={{ cervejaArtesanalConsultada, setCervejaArtesanalConsultada, encomendaConsultado, setEncomendaConsultado, gerenteEmpórioInteressado, setGerenteEmpórioInteressado }}
        >
        {children}
        </ContextoCriador.Provider>
    );
}