import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export interface Config {
  operation?: string;
  query?: { type: any };
  params?: { type: any };
  responses?: { status: number; type: any }[];
}

export function ControllerDecoratorAggregator(config: Config) {
  const decorators: MethodDecorator[] = [];

  if (config.operation) {
    decorators.push(ApiOperation({ summary: config.operation }));
  }

  if (config.query?.type) {
    decorators.push(ApiQuery({ type: config.query.type }));
  }

  if (config.params?.type) {
    decorators.push(ApiParam({ name: 'id', type: config.params.type }));
  }

  if (config.responses?.length) {
    for (const response of config.responses) {
      decorators.push(
        ApiResponse({ status: response.status, type: response.type }),
      );
    }
  }

  return applyDecorators(...decorators);
}
