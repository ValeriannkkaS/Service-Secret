export interface insertSecretTableInterface {
  encrypted_value: string;
  iv: string;
  link: string;
  expires_at: Date;
  remaining_views_count: number;
}
