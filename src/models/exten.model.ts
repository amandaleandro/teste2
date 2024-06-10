import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'extens' })
export class Exten {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column({ nullable: false })
  secret: string;

  @Column({ nullable: true })
  callerid: string;

  @Column({ nullable: false })
  protocol: string;

  @Column({ nullable: false })
  protocolId: string;

  @Column({ name: 'dialstring', nullable: false })
  dialstring: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    console.log('======== before save');
  }
}
