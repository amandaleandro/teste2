import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CallClassification } from './call-classificatoin.model';
import { User } from './user.model';

@Entity({ name: 'negotiation-call' })
export class NegotiationCall {
  @PrimaryColumn({ unique: true })
  id: string;

  @ManyToOne(() => CallClassification, { eager: true })
  @JoinColumn({ name: 'classification' })
  classification: CallClassification;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'agent' })
  agent: User;

  @Column({ name: 'record_url', nullable: true })
  record_url: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
