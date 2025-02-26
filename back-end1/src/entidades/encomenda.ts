import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Empório from "./empório";
import CervejaArtesanal from "./cerveja-artesanal";

export enum Status {PD = "Pendente", EP = "Em preparação", EN = "Enviada", ET = "Entregue"};

@Entity()
export default class Encomenda extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  data: Date;

  @Column({ type: "enum", enum: Status })
  status: Status; 

  @Column()
  valor_total: number;

  @ManyToOne(() => CervejaArtesanal, (CervejaArtesanal) => CervejaArtesanal.encomendas, {
    onDelete: "CASCADE",
  })
  cervejaArtesanal: CervejaArtesanal;

  @ManyToOne(() => Empório, (empório) => empório.encomendas, {
    onDelete: "CASCADE",
  })
  empório: Empório;
}
