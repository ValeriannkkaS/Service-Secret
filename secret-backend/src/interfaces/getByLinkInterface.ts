export interface GetByLinkInterface {
  id: string;
  encrypted_value: string;
  iv: string;
  link: string;
  expires_at: Date | null;
  remaining_views_count: number;
  allow_deletions: boolean;
}
