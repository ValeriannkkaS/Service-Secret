import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({
    example: '"availableViews" must be a number',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;
}

export interface BadRequestResponseInterface {
  message: string;
  error?: string;
  statusCode: number;
}
