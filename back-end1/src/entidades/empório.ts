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
import Encomenda from "./encomenda";

@Entity()
export default class Empório extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  localização: string;

  @Column()
  capacidade_estoque: number;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.empório)
  encomendas: Encomenda[];

  @OneToOne(() => Usuário, (usuário) => usuário.empório, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
