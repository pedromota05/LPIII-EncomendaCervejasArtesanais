import { createContext, useState } from "react";
const ContextoCriador = createContext();
export default ContextoCriador;
export function ProvedorCriador({ children }) {
    const [cervejaArtesanalConsultada, setCervejaArtesanalConsultada] = useState({});
    return (
        <ContextoCriador.Provider
        value={{ cervejaArtesanalConsultada, setCervejaArtesanalConsultada }}
        >
        {children}
        </ContextoCriador.Provider>
    );
}