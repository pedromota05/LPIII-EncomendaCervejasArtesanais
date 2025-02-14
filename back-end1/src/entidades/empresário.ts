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
import Interesse from "./interesse";
// corrigir os atributos
export enum Setor {
  Ev = "Eventos",
  PB = "Publicidade",
  ET = "Entretenimento",
}

@Entity()
export default class Empresário extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  empresa: string;

  @Column({ type: "enum", enum: Setor })
  curso: Setor;

  @Column()
  telefone: number;

  @OneToMany(() => Interesse, (interesse) => interesse.empresário)
  interesses: Interesse[];

  @OneToOne(() => Usuário, (usuário) => usuário.empresário, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
