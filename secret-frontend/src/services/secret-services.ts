import $api from '@/http'
import type { SecretDto } from '@/constants&interfaces/interfaces.ts'

export default class SecretServices {
  static async createSecret(secretDto: SecretDto) {
    try {
      const response = await $api.post<SecretDto>('/create-secret-phrase', {
        ...secretDto,
      })
      return response
    } catch (error) {
      throw error
    }
  }

  static async getSecretPhrase(link: string) {
    try {
      const response = await $api.get(`/${link}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async generateSecretPhrase(length: number) {
    try {
      const response = await $api.get(`/generate/${length}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
