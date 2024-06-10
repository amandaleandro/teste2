/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { operationStatus } from './operation-status.dto';
import { Pause } from './pause.model';

@Entity({ name: 'operation' })
export class Operation {
  @PrimaryColumn()
  userId: string;

  @Column({
    type: 'enum',
    enum: operationStatus,
    default: operationStatus.Available,
  })
  status: operationStatus;

  @Column({ nullable: true })
  pause: string;

  @Column({ nullable: false })
  exten: string;

  @CreateDateColumn({ type: 'timestamp', name: 'logged_at' })
  loggedAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
