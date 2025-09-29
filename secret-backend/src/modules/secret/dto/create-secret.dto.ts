import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  description: 'Description of the CreateSecretDTO generate secret',
})
export class CreateSecretDto {
  @ApiProperty({
    description: 'Secret password',
    type: String,
    example: 'qwertyasdfg',
  })
  readonly secretPhrase: string;

  @ApiProperty({
    description:
      'Shows how many milliseconds it will take for the password to be deleted from the database',
    type: Number,
    example: 8640000,
  })
  readonly expiresInTimestamp: number;

  @ApiProperty({
    description:
      'Shows how many views on client it will have for the password to be deleted from the database',
    type: Number,
    example: 3,
  })
  readonly availableViews: 1 | 3 | 5 | 10;

  @ApiProperty({
    description:
      'Shows whether users can delete the password from the client themselves',
    type: Boolean,
    example: true,
  })
  readonly allowDeletions: boolean;
}
