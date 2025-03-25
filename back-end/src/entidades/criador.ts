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
import CervejaArtesanal from "./cerveja-artesanal"; 

export enum EstiloCervejaEspecializado {
  AmericanPaleAle = "americanPaleAle",
  Weissbier = "weissbier",
  AmericanIPA = "americanIPA",
  EnglishPaleAle = "englishPaleAle",
  Taison = "taison",
}

@Entity()
export default class Criador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pais_origem: string;

  @Column()
  ano_fundação: number;

  @Column({ type: "enum", enum: EstiloCervejaEspecializado })
  estilo_cerveja_especializado: EstiloCervejaEspecializado;

  @OneToMany(() => CervejaArtesanal, (cervejaArtesanal) => cervejaArtesanal.criador)
  cervejasArtesanais: CervejaArtesanal[];

  @OneToOne(() => Usuário, (usuário) => usuário.criador, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
