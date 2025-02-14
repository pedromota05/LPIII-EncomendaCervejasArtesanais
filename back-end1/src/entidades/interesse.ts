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

  @CreateDateColumn()
  data_manifestação: Date;

  @Column()
  justificativa: string;

  @Column()
  orçamento_disponível: number;

  @ManyToOne(() => Proposta, (proposta) => proposta.interesses, {
    onDelete: "CASCADE",
  })
  proposta: Proposta;

  @ManyToOne(() => Empresário, (empresário) => empresário.interesses, {
    onDelete: "CASCADE",
  })
  empresário: Empresário;
}
