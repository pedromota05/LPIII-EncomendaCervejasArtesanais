import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Interesse from "./interesse";
import Maestro from "./maestro";

export enum Categoria {
  CONCERTO = "concerto",
  SHOW = "show",
  FESTIVAL = "festival",
}

export enum Repertório {
  CLÁSSICO = "clássico",
  POP = "pop",
  MISTO = "misto",
}

@Entity()
export default class Proposta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  título: string;

  @Column({ type: "enum", enum: Categoria })
  categoria: Categoria;

  @Column({ type: "enum", enum: Repertório })
  repertório: Repertório;

  @Column({ type: "date" })
  data_proposta: Date;

  @Column()
  descrição: string;

  @ManyToOne(() => Maestro, (maestro) => maestro.propostas, {
    onDelete: "CASCADE",
  })
  maestro: Maestro;

  @OneToMany(() => Interesse, (interesse) => interesse.proposta)
  interesses: Interesse[];
}
