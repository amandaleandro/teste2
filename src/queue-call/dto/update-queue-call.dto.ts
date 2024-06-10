import { PartialType } from '@nestjs/swagger';
import { CreateQueueCallDto } from './create-queue-call.dto';

export class UpdateQueueCallDto extends PartialType(CreateQueueCallDto) {}
