import { PartialType } from '@nestjs/swagger';
import { Pause } from 'src/models/pause.model';

export class UpdatePauseDto extends PartialType(Pause) {}
