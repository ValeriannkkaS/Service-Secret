import { ApiProperty } from '@nestjs/swagger';

export class ResponseCheckSecretDto {
  @ApiProperty({
    description: "exists password's id",
    type: String,
    example: '5fb28aad-63cc-453f-a5f4-316dfc290512',
  })
  link: string;

  @ApiProperty({
    description: 'exist password or not',
    type: String,
    example: true,
  })
  exist: boolean;
}
