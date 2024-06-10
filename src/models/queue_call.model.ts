import { Column, Entity } from 'typeorm';

import { BaseModel } from './basemodel';

@Entity({ name: 'queue_call' })
export class QueueCall extends BaseModel {
  @Column({ unique: true, nullable: false })
  name: string;
}
