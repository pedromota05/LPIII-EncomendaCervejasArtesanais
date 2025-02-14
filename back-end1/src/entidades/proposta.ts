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
//corrigir os atributos
export enum Categoria {
  EXTENSÃO = "Extensão",
  IC = "Iniciação Científica",
  TCC = "TCC",
}
export enum Resultado {
  ARTIGO = "artigo",
  DESENVOLVIMENTO = "desenvolvimento",
  MONOGRAFIA = "monografia",
}

@Entity()
export default class Proposta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  título: string;

  @Column({ type: "enum", enum: Categoria })
  categoria: Categoria;

  @Column()
  área_atuação: string;

  @Column({ type: "date" })
  data_início: Date;

  @Column()
  descrição: string;

  @Column()
  concorrendo_bolsa: boolean;

  @Column({ type: "enum", enum: Resultado })
  resultado: Resultado;

  @ManyToOne(() => Maestro, (maestro) => maestro.propostas, {
    onDelete: "CASCADE",
  })
  maestro: Maestro;

  @OneToMany(() => Interesse, (interesse) => interesse.proposta)
  interesses: Interesse[];
}
