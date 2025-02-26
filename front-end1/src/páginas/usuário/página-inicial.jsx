import { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuário from "../../contextos/contexto-usuário";
import img from "../../imagens/imagem-degustacao.png";
import {
  estilizarCard,
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
      <Image src={img} alt="Venha fazer a diferença!" width="400" />
    </div>
  );
}
