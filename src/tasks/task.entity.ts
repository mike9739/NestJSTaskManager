import { BaseEntity } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';
import { TaskStatus } from './taskStatus.enum';

@Entity()
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status:TaskStatus;
}