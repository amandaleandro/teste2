import { Injectable } from '@nestjs/common';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { Customer } from 'src/models/customer.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends BasicRepository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {
    super(customerRepository);
  }
}
