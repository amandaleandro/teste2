import { PartialType } from '@nestjs/swagger';
import { CreateCallClassificationDto } from './create-call-classification.dto';

export class UpdateCallClassificationDto extends PartialType(CreateCallClassificationDto) {}
