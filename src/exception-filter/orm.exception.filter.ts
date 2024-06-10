import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { AgentNotFoundError } from './exceptions/agent-not-found.error';
import { StateChangeError } from './exceptions/change-state.error';
import { PbxUnavailableError } from './exceptions/pbx-unavailable.error';

@Catch(
  EntityNotFoundError,
  QueryFailedError,
  AgentNotFoundError,
  StateChangeError,
  PbxUnavailableError,
)
export class OrmExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception.name === 'StateChangeError') {
      return response.status(409).json({
        statusCode: 409,
        message: 'Impossible to change state',
      });
    }
    if (exception.name === 'PbxUnavailableError') {
      return response.status(503).json({
        statusCode: 409,
        message: 'PBX Unavailable',
      });
    }
    if (
      exception.name === 'EntityNotFoundError' ||
      exception.name === 'AgentNotFoundError'
    ) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Objeto com Id Informado não foi encontrado',
      });
    }
    if (exception.name === 'QueryFailedError') {
      return response.status(422).json({
        statusCode: 422,
        message: `Não foi possível processar essa transação: ${exception.message} `,
      });
    }
    return response
      .status(500)
      .json({ statusCode: 500, message: `Internal Server Error` });
  }
}
