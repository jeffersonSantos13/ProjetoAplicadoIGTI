/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Nutritionist from './Nutritionist';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  avatar_url: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;

  @Column()
  first_login: boolean;

  @Column()
  gender: string;

  @Column()
  desire_weight: number;

  @Column()
  sub: string;

  @Column()
  providerId: string;

  @Column()
  nutritionist_id?: string;

  @ManyToOne(() => Nutritionist)
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: Nutritionist;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
