import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationLogService } from './operation-log.service';


@Controller('operation-log')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}


}
