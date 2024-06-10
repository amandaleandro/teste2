import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'operation_log' })
export class OperationLog {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'enum',
  //   enum: OperationEventLogType,
  //   nullable: false,
  // })
  @Column({ nullable: true })
  event: string;

  @Column({ nullable: false })
  agentId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true })
  data: string;
}
