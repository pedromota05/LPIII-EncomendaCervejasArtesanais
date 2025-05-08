import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ContextoUsuário from "../../contextos/contexto-usuário";
import ContextoGerenteEmpório from "../../contextos/contexto-gerente-empório";
import {
    estilizarBotãoRetornar,
    estilizarCard,
    estilizarCheckbox,
    estilizarDivCampo,
    estilizarDivider,
    estilizarFlex,
    estilizarInlineFlex,
    estilizarInputText,
    estilizarLabel,
} from "../../utilitários/estilos";

 export default function ConsultarCervejaArtesanal() {
   const { usuárioLogado } = useContext(ContextoUsuário);
   const { cervejaArtesanalConsultada, cervejaArtesanalInteresse } =
     useContext(ContextoGerenteEmpório);
   const dados = {
     nome_criador:
       cervejaArtesanalConsultada?.criador?.usuário?.nome ||
       cervejaArtesanalInteresse?.criador?.usuário?.nome,
     nome: cervejaArtesanalConsultada?.nome || cervejaArtesanalInteresse?.nome,
     teor_alcoolico:
     cervejaArtesanalConsultada?.teor_alcoolico || cervejaArtesanalInteresse?.teor_alcoolico,
     categoria:
     cervejaArtesanalConsultada?.categoria || cervejaArtesanalInteresse?.categoria,
     disponibilidade:
     cervejaArtesanalConsultada?.disponibilidade || cervejaArtesanalInteresse?.disponibilidade,
   };
   const navegar = useNavigate();
   function retornar() {
     if (cervejaArtesanalConsultada) navegar("../pesquisar-cervejas-artesanais");
     else if (cervejaArtesanalInteresse) navegar("../cadastrar-encomenda");
   }
   return (
     <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
    }}>
       <Card
         title="Consultar Cerveja Artesanal"
         className="my_card_criador"
       >
         <div className="flex mb-3" style={{ flexDirection: "column" }}>
           <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
             Criador*:
           </label>
           <InputText
             name="nome_criador"
             className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
             style={{ height: "35px" }}
             value={dados.nome_criador}
             disabled
           />
         </div>
         <div className="flex mb-3" style={{ flexDirection: "column" }}>
           <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
             Nome*:
           </label>
           <InputText
             name="nome"
             className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
             style={{ height: "35px" }}
             value={dados.nome}
             disabled
           />
         </div>
         <div className="flex mb-3" style={{ flexDirection: "column" }}>
           <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
             Teor Alcoólico (%)*:
           </label>
           <InputText
             name="teor_alcoolico"
             className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
              style={{ height: "35px" }}
             value={cervejaArtesanalConsultada?.teor_alcoolico || cervejaArtesanalInteresse?.teor_alcoolico}
             disabled
           />
         </div>
         <div className="flex mb-3" style={{ flexDirection: "column" }}>
           <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
             Categoria*:
           </label>
           <InputText
             name="categoria"
             className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
             style={{ height: "35px" }}
             value={cervejaArtesanalConsultada?.categoria || cervejaArtesanalInteresse?.categoria}
             disabled
           />
         </div>
         <div className="flex mb-3" style={{ flexDirection: "column" }}>
           <label className={`mb-1 font-bold ${estilizarLabel(usuárioLogado.cor_tema)}`}>
             Disponibilidade*:
           </label>
           <InputText
             name="disponibilidade"
             className={`border rounded px-2 py-1 ${estilizarInputText(null, usuárioLogado.cor_tema)}`}
             style={{ height: "35px" }}
             value={cervejaArtesanalConsultada?.disponibilidade || cervejaArtesanalInteresse?.disponibilidade}
             disabled
           />
         </div>
         <Divider className={estilizarDivider()} />
         <div className={estilizarInlineFlex()}>
           <Button
             className={estilizarBotãoRetornar()}
             label="Retornar"
             onClick={retornar}
           />
         </div>
       </Card>
     </div>
   );
}