export interface SecretEntry {
  id: string;
  encrypted_value: string;
  iv: string;
  expires_at: Date;
  remaining_views_count: number;
  allow_deletions: boolean;
}
