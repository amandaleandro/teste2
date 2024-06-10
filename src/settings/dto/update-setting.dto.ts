import { PartialType } from '@nestjs/swagger';
import { Setting } from 'src/models/settings.model';

export class UpdateSettingDto extends PartialType(Setting) {}
