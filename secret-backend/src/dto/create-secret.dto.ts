export class CreateSecretDto {
  readonly secretPhrase: string;
  readonly expiresIn: Date;
  readonly availableViews: number;
}
