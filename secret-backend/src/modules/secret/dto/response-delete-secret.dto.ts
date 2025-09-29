import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteSecretByLinkDTO {
  @ApiProperty({
    description: "deleted password's id",
    type: String,
    example: '5fb28aad-63cc-453f-a5f4-316dfc290512',
  })
  id: string;
}
