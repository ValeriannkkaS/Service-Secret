import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty({
    example: '"this link is not found',
  })
  message: string;

  @ApiProperty({
    example: 404,
  })
  statusCode: number;
}
