import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Usuário from "./usuário";
import Proposta from "./proposta";

export enum Titulação {
  MESTRADO = "mestrado",
  DOUTORADO = "doutorado",
}

export enum Especialidade {
  Clássico = "clássico",
  Pop = "pop",
  Jazz = "Jazz",
  Contemporâneo = "contemporâneo",
}

@Entity()
export default class Maestro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Titulação })
  titulação: Titulação;

  @Column()
  anos_experiência: number;

  @Column()
  especialidade: Especialidade;

  @OneToMany(() => Proposta, (proposta) => proposta.maestro)
  propostas: Proposta[];

  @OneToOne(() => Usuário, (usuário) => usuário.maestro, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
