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

export enum NívelExperiência {
  Junior = "junior",
  Pleno = "pleno",
  Senior = "senior",
}

@Entity()
export default class GerenteEmpório extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telefone: string;

  @Column()
  localização_pais: string;

  @Column({ type: "enum", enum: NívelExperiência })
  nível_experiência: NívelExperiência;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.gerenteEmpório)
  encomendas: Encomenda[];

  @OneToOne(() => Usuário, (usuário) => usuário.gerenteEmpório, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  usuário: Usuário;
}
