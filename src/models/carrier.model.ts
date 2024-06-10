import { Column, Entity } from 'typeorm';
import { BaseModel } from './basemodel';

@Entity({ name: 'carrier' })
export class Carrier extends BaseModel {
  @Column({ nullable: false })
  secret: string;

  @Column({ nullable: true })
  callerid: string;

  @Column({ nullable: false })
  protocol: string;

  @Column({ nullable: false })
  host: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'dialstring', nullable: false })
  dialstring: string;
}
