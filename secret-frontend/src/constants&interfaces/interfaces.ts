export interface optionForSelect {
  id: number
  text: {
    en: string
    ru: string
  }
  value: number
}
export interface SecretDto {
  secretPhrase: string
  expiresInTimestamp: number
  availableViews: number
}
