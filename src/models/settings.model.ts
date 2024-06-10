import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'setting' })
export class Setting {
  @PrimaryColumn()
  name: string;

  @Column('json', { nullable: true })
  value: any;

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
