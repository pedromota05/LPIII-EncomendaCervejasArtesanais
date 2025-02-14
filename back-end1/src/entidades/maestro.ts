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

// conferir se a relação com a entidade Usuário está correta

@Entity()
export default class Maestro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Titulação })
  titulação: Titulação;

  @Column()
  anos_experiência_empresarial: number;

  @OneToMany(() => Proposta, (proposta) => proposta.maestro)
  propostas: Proposta[];

  @OneToOne(() => Usuário, (usuário) => usuário.maestro, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
