import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './basemodel';
import { Exten } from './exten.model';

@Entity({ name: 'user' })
export class User extends BaseModel {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ name: 'login' })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true, unique: true })
  exten_id: string;

  @Column({ nullable: true, name: 'external_id' })
  externalId: string;

  @Column('json', { nullable: true })
  properties: any;

  @OneToOne(() => Exten, { eager: true })
  @JoinColumn({ name: 'exten' })
  exten: Exten;
}
