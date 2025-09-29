import { ApiProperty } from '@nestjs/swagger';

export class ResponseGenerateSecretDTO {
  @ApiProperty({
    description: 'randomly generated password',
    type: String,
    example: 'e527e864c7fb56ce1e5e',
  })
  secretPhrase: string;
}
