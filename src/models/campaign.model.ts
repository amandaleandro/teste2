import { Column, Entity } from 'typeorm';

import { BaseModel } from './basemodel';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

@Entity({ name: 'campaign' })
export class Campaign extends BaseModel {
  @Column({ name: 'agent', nullable: true })
  agent: string;

  @Column({ name: 'external_agent_id', nullable: true })
  externalAgentId: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column('json', { nullable: true })
  customers: CreateCustomerDto[];

  @Column({ name: 'penalty', default: 0 })
  penalty: number;
}
