import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import Criador from "./criador";
import Encomenda from "./encomenda";

export enum Categoria {
  IndiaPaleAle = "indiaPaleAle",
  Stout = "stout",
  Pilsen = "pilsen",
  AmberAle = "amberAle",
  AmericanPaleAle = "americanPaleAle",
  PaleAle = "paleAle",
}

export enum Disponibilidade {
  AnoTodo = "anoTodo",
  Limitada = "limitada",
}

@Entity()
export default class CervejaArtesanal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  teor_alcoolico: number;

  @Column({ type: "enum", enum: Categoria })
  categoria: Categoria;

  @Column({ type: "enum", enum: Disponibilidade })
  disponibilidade: Disponibilidade;

  @ManyToOne(() => Criador, (criador) => criador.cervejasArtesanais, {
    onDelete: "CASCADE",
  })
  criador: Criador;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.cervejaArtesanal)
  encomendas: Encomenda[];
}
