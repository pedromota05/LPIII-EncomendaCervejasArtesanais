import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import GerenteEmpório from "./gerente-empório";
import CervejaArtesanal from "./cerveja-artesanal";

@Entity()
export default class Encomenda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  data_encomenda: Date;
  
  @Column()
  valor_total: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => CervejaArtesanal, (CervejaArtesanal) => CervejaArtesanal.encomendas, {
    onDelete: "CASCADE",
  })
  cervejaArtesanal: CervejaArtesanal;

  @ManyToOne(() => GerenteEmpório, (gerenteEmpório) => gerenteEmpório.encomendas, {
    onDelete: "CASCADE",
  })
  gerenteEmpório: GerenteEmpório;
}
