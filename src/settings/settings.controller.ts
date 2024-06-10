import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { createWebhookDTO } from './dto/create-webhook.dto';
import { createPbxDto } from './dto/create-pbx.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('webhook')
  create(@Body() dto: createWebhookDTO, @Request() req) {
    this.settingsService.create(
      {
        name: 'webhook',
        value: dto,
      },
      req.user,
    );
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('pbx')
  createPbx(@Body() dto: createPbxDto, @Request() req) {
    this.settingsService.create(
      {
        name: 'pbx',
        value: dto,
      },
      req.user,
    );
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.settingsService.findById(id).then((ret) => ret.value);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
  //   return this.settingsService.update(id, updateSettingDto);
  // }
}
