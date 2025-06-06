import { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuário from "../../contextos/contexto-usuário";
import imagem from "../../imagens/imagem.png";
import {
  estilizarCard,
  estilizarCardHome,
  estilizarCardHeaderCentralizado,
  estilizarPáginaÚnica,
} from "../../utilitários/estilos";

export default function PáginaInicial() {
  const { usuárioLogado } = useContext(ContextoUsuário);
  function HeaderCentralizado() {
    return (
      <div className={estilizarCardHeaderCentralizado()}>
        Encomenda de Cervejas Artesanais
      </div>
    );
  }
  return (
    <div className={`image-responsive ${estilizarPáginaÚnica()}`}>
      <div className={estilizarCardHeaderCentralizado(usuárioLogado.cor_tema)}>
        Encomenda de Cervejas Artesanais
      </div>
      <Card className={`${estilizarCardHome(usuárioLogado.cor_tema)} centralizar-conteúdo`}>
        <Image src={imagem} alt="Imagem do projeto Degustações Cervejas Artesanais" width="400" />
      </Card>
    </div>
  );
}
