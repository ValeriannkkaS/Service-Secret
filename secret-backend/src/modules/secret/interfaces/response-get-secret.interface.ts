export interface GetSecretResponse {
  decryptedPhrase: string;
  link: string;
  expiresAt: string;
  remainingViewsCount: number;
  allowDeletions: boolean;
}
