import { Column, Entity } from 'typeorm';

import { BaseModel } from './basemodel';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

@Entity({ name: 'wallet' })
export class Wallet extends BaseModel {
  @Column({ name: 'agent', nullable: false })
  agent: string;

  @Column('json', { nullable: true })
  customers: CreateCustomerDto[];
}
