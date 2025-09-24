import $api from '@/http'
import type { SecretDto } from '@/constants&interfaces/interfaces.ts'

export default class SecretServices {
  static async createSecret(secretDto: SecretDto) {
    const response = await $api.post<SecretDto>('/create-secret-phrase', {
      ...secretDto,
    })
    return response.data
  }
  static async getSecretPhrase(link: string) {
    const response = await $api.get(`/${link}`)
    return response.data
  }
}
