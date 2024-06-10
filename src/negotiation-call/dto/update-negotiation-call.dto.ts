import { PartialType } from '@nestjs/swagger';
import { CreateNegotiationCallDto } from './create-negotiation-call.dto';

export class UpdateNegotiationCallDto extends PartialType(CreateNegotiationCallDto) {}
