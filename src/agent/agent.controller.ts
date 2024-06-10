import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Put,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Roles } from 'src/auth/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { User } from 'src/models/user.model';
import { passwordHash } from 'src/common/utils/tools';
import { CreateAgentDTO } from './dto/createAgentDto';
import { AgentService } from './agent.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
@Controller({ path: 'agent', version: '1' })
export class AgentControllerV1 {
  constructor(
    private readonly userService: UserService,
    private readonly service: AgentService,
    private readonly walletService: WalletService,
  ) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Request() req, @Body() createAgentDTO: CreateAgentDTO) {
    const user = createAgentDTO.createUserDTO();
    return this.userService.create(user, req.user as User);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id/wallet')
  updateWallet(
    @Request() req,
    @Param('id') id,
    @Body(new ParseArrayPipe({ items: CreateCustomerDto }))
    customers: CreateCustomerDto[],
  ) {
    return this.walletService.updateWallet(id, customers, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id/wallet')
  putWallet(
    @Request() req,
    @Param('id') id,
    @Body(new ParseArrayPipe({ items: CreateCustomerDto }))
    customers: CreateCustomerDto[],
  ) {
    return this.walletService.putCustomer(id, customers, req.user);
  }
  // @HttpCode(204)
  // @Patch(':id/wallet')
  // addLeadsToWallet(@Request() req, @Param('id') id: string) {
  //   console.log(`add leads to wallet ${id} `);
  // }

  // @HttpCode(204)
  // @Put(':id/wallet')
  // newWallet(@Request() req, @Param('id') id: string) {
  //   console.log(`new wallet ${id} `);
  // }

  // @Roles('AGENT')
  // @UseGuards(JwtGuard, RoleGuard)
  // @HttpCode(204)
  // @Post('call/:leadId')
  // callToLead(
  //   @Request() req,
  //   @Param('id') id: string,
  //   @Param('leadId') leadId: string,
  // ) {
  //   console.log(`Ligando ${id} - cliente ${leadId}`);
  // }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(204)
  @Post(':id/call-to/:phone')
  callToPhone(@Request() req, @Param('id') id, @Param('phone') phone: string) {
    console.log(`Ligando ${phone} - phone ${phone}`);
    return this.service.call(id, phone);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(204)
  @Post(':id/call-to/:phone/:external_id')
  callToPhoneExternal(
    @Request() req,
    @Param('id') id,
    @Param('phone') phone: string,
    @Param('external_id') externalId: string,
  ) {
    console.log(`Ligando ${phone} - phone ${phone} id - ${externalId}`);
    return this.service.call(id, phone);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(204)
  @Post(':id/hangup')
  hangup(@Request() req, @Param('id') id) {
    return this.service.hangup(id);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(204)
  @Post(':id/classification/:classification')
  callClassification(
    @Request() req,
    @Param('id') id,
    @Param('classifiction') classification: string,
  ) {
    console.log(`classification ${classification} `);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(204)
  @Post(':id/classification/:classification/call/:call')
  callClassificate(
    @Request() req,
    @Param('id') id,
    @Param('classification') classificationId: string,
    @Param('call') callId: string,
  ) {
    return this.service.classificateCall(id, classificationId, callId);
  }

  @Roles('AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('login')
  async loginAgent(@Request() req) {
    return await this.service.login(req.user.id);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/login')
  async loginAgentById(@Request() req, @Param('id') id) {
    return await this.service.login(id);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/logout')
  logout(@Request() req, @Param('id') id) {
    return this.service.logout(id);
  }

  @Roles('AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logoutAgent(@Request() req) {
    return this.service.logout(req.user.id);
  }

  @Roles('AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('pause/:pauseId')
  async pauseAgent(@Request() req, @Param('pauseId') pauseId: string) {
    return await this.service.pause(req.user.id, pauseId);
  }

  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/pause/:pauseId')
  async pause(
    @Request() req,
    @Param('id') id,
    @Param('pauseId') pauseId: string,
  ) {
    return await this.service.pause(id, pauseId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('ADMIN', 'SUPER', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id/pause')
  async unpause(@Request() req, @Param('id') id) {
    return await this.service.unpause(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @Delete('pause')
  async unpauseAgent(@Request() req) {
    return await this.service.unpause(req.user.id);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll() {
    return this.userService.findBy({ role: 'AGENT' }).then((res) => {
      res.forEach((c) => {
        delete c.password;
        return c;
      });
      return res;
    });
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findById(id);
    return user.then((u) => {
      delete u.password;
      return u;
    });
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (dto.password) {
      const hash = await passwordHash(dto.password);
      dto.password = hash;
    }
    return this.userService.update(id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deactive(id);
  }
}
