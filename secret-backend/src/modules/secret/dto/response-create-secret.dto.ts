import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateSecretDTO {
  @ApiProperty({
    description: 'link for view password on client',
    type: String,
    example: '5e9eda42-a826-486f-8a9a-103f819d9240',
  })
  link: string;

  @ApiProperty({
    description: 'Shows when the password will be deleted',
    type: String,
    example: '2025-10-01T12:06:41.308Z',
  })
  expiresAt: string;

  @ApiProperty({
    description:
      'Shows how many views on client it will have for the password to be deleted from the database',
    type: Number,
    example: 5,
  })
  remainingViewsCount: number;

  @ApiProperty({
    description:
      'Shows whether users can delete the password from the client themselves',
    type: Boolean,
    example: true,
  })
  allowDeletions: boolean;
}
