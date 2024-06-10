import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ContactDTO } from './contact.dto';
import { CustomerContactDTO } from './customer_contact';

export class CreateCustomerDto {
  @IsOptional()
  @IsString()
  externalId: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsUrl()
  photoUri: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  registrationNumber: string;

  @IsOptional()
  @IsString()
  streetAddress: string;

  @IsOptional()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  zipCode: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  lastClassification: string;

  @IsOptional()
  @IsString()
  lastNote: string;

  @IsOptional()
  lastContactDate: Date;

  @IsOptional()
  amountDue: number;

  @IsOptional()
  amountOverDue: number;

  // @Column({ nullable: true, name: 'custom_fields' })
  // customFields: Map<string, string>;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  contacts: ContactDTO[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  phones: CustomerContactDTO[];

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  scheduled: boolean;

  @IsOptional()
  preferredScheduledTime: Date;

  @IsOptional()
  @IsString()
  preferredScheduledDay: string;

  @IsOptional()
  @IsString()
  agentId: string;
}
