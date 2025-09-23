export class CreateSecretDto {
  readonly secretPhrase: string;
  readonly expiresInTimestamp: number;
  readonly availableViews: number;
}
