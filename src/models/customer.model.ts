import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './basemodel';
import { ContactDTO } from 'src/customers/dto/contact.dto';
import { User } from './user.model';

@Entity({ name: 'lead' })
export class Customer extends BaseModel {
  @Column({ nullable: true, name: 'external_id' })
  externalId: string;

  @Column({ nullable: true, name: 'full_name' })
  fullName: string;

  @Column({ nullable: true, name: 'photo_uri' })
  photoUri: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false, name: 'identification' })
  registrationNumber: string;

  @Column({ nullable: true, name: 'street_address' })
  streetAddress: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, name: 'zip_code' })
  zipCode: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  lastClassification: string;

  @Column({ nullable: true, name: 'last_note' })
  lastNote: string;

  @Column({ type: 'timestamp', name: 'last_contact_date' })
  lastContactDate: Date;

  @Column({ nullable: true, name: 'amount_due' })
  amountDue: number;

  @Column({ nullable: true, name: 'amount_over_due' })
  amountOverDue: number;

  // @Column({ nullable: true, name: 'custom_fields' })
  // customFields: Map<string, string>;

  @Column('json', { nullable: true })
  contacts: ContactDTO[];

  @Column({ default: false })
  scheduled: boolean;

  @Column({ nullable: true, name: 'preferred_scheduled_time' })
  preferredScheduledTime: Date;

  @Column({ nullable: true, name: 'preferred_scheduled_day' })
  preferredScheduledDay: string;

  @JoinColumn({ name: 'agent_id' })
  @ManyToOne(() => User)
  agent: User;
}
