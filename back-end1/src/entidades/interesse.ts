import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Proposta from "./proposta";
import Empresário from "./empresário";

//corrigir os atributos
@Entity()
export default class Interesse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  necessidade_bolsa: boolean;

  @Column()
  justificativa: string;

  @CreateDateColumn()
  data_manifestação: Date;

  @ManyToOne(() => Proposta, (proposta) => proposta.interesses, {
    onDelete: "CASCADE",
  })
  proposta: Proposta;

  @ManyToOne(() => Empresário, (empresário) => empresário.interesses, {
    onDelete: "CASCADE",
  })
  empresário: Empresário;
}
