import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

import { Campaign } from 'src/models/campaign.model';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService extends BasicRepository<Campaign> {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {
    super(campaignRepository);
  }

  async updateContacts(
    campaignId: string,
    customers: CreateCustomerDto[],
    user: User,
  ) {
    const campaign = await this.findById(campaignId);
    if (!campaign) {
      throw new Error('campaign not found');
    }
    if (!campaign.customers) {
      campaign.customers = customers;
    } else {
      for (const c of customers) {
        campaign.customers.push(c);
      }
    }
    await this.update(campaignId, campaign, user);
  }

  async putContacts(
    campaignId: string,
    customers: CreateCustomerDto[],
    user: User,
  ) {
    const campaign = await this.findById(campaignId);
    if (!campaign) {
      throw new Error('campaign not found');
    }
    campaign.customers = customers;
    await this.update(campaignId, campaign, user);
  }
}
