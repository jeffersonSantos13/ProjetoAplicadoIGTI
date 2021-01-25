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

import User from './User';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  user_id: string;

  @Column()
  nutritionist_id: string;

  @Column()
  description: string;

  @Column()
  recipe: string;

  @Column()
  prepare_mode: string;

  @Column()
  photo: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Nutritionist)
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: Nutritionist;

  @Column()
  canceled_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
