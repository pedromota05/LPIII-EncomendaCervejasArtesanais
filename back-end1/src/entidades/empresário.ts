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
export enum Curso {
  EC = "Engenharia de Computação",
  SI = "Sistemas de Informação",
}

@Entity()
export default class Empresário extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Curso })
  curso: Curso;

  @Column()
  ano_ingresso: number;

  @Column({ type: "date" })
  data_nascimento: Date;

  @Column()
  telefone: string;

  @OneToMany(() => Interesse, (interesse) => interesse.empresário)
  interesses: Interesse[];

  @OneToOne(() => Usuário, (usuário) => usuário.empresário, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
