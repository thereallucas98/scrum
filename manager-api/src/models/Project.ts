import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity("projects")
class Projects {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "creator_id" })
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  viability: number;

  @Column()
  status: number;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  expected_finished_date: Date;

  @CreateDateColumn()
  finished_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Projects };