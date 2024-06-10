import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService extends BasicRepository<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {
    super(walletRepository);
  }

  async updateWallet(
    agentId: string,
    customers: CreateCustomerDto[],
    user: User,
  ) {
    const wallet = await this.validateWallet(agentId, user);
    for (const c of customers) {
      wallet.customers.push(c);
    }
    await this.update(wallet.id, wallet, user);
  }

  async putCustomer(
    agentId: string,
    customers: CreateCustomerDto[],
    user: User,
  ) {
    const wallet = await this.validateWallet(agentId, user);
    wallet.customers = customers;
    await this.update(wallet.id, wallet, user);
  }

  async validateWallet(agentId: string, user: User): Promise<Wallet> {
    const wallet = await this.findOneBy({ agent: agentId });
    if (!wallet) return await this.save({ agent: agentId }, user);

    return wallet;
  }
}
