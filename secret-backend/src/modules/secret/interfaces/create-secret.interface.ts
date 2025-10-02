export interface CreateSecret {
  readonly secretPhrase: string;
  readonly expiresInTimestamp: number;
  readonly availableViews: 1 | 3 | 5 | 10;
  readonly allowDeletions: boolean;
}
