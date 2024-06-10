import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectLiteral,
} from 'typeorm';

export abstract class BaseModel implements ObjectLiteral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_archived' })
  isArchived: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300, name: 'created_by', nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 300,
    name: 'last_changed_by',
    nullable: true,
  })
  lastChangedBy: string;
}
