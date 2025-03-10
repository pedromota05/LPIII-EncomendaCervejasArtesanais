import { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuário from "../../contextos/contexto-usuário";
import img from "../../imagens/imagem-degustacao.png";
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
      <div className={estilizarCardHeaderCentralizado()}>
        Encomenda de Cervejas Artesanais
      </div>
      <Card className={estilizarCardHome(usuárioLogado.cor_tema)}>
        <Image src={img} alt="Imagem do projeto Degustações Cervejas Artesanais" width="400" />
      </Card>
    </div>
  );
}
