import { User } from './../auth/user.entity';
import {
  BaseEntity,
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Todo } from '../Todo/todo.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  @JoinColumn({
    name: 'user_id',
  })
  user: User | number;

  @ManyToOne((type) => Todo, (todo) => todo.tasks, {
    eager: false,
  })
  @JoinColumn({
    name: 'todo_id',
  })
  todo: Todo | number;

  @Column({
    type: 'timestamp',
  })
  due_date: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt?: Date;

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeRemove()
  beforeDestroy() {
    this.deletedAt = new Date();
  }
}
