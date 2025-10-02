import { fetchApi } from '@/http'
import type { SecretDto } from '@/constants&interfaces/interfaces.ts'

export default class SecretServices {
  private static apiUrl = import.meta.env.VITE_API_URL

  static async createSecret(secretDto: SecretDto) {
    try {
      return await fetchApi.post<SecretDto>(`${this.apiUrl}/create-secret-phrase`, secretDto)
    } catch (error) {
      throw error
    }
  }

  static async getSecretPhrase(link: string): Promise<SecretDto> {
    try {
      return await fetchApi.get<SecretDto>(`${this.apiUrl}/${link}`)
    } catch (error) {
      throw error
    }
  }

  static async deleteSecretPhrase(link: string): Promise<SecretDto> {
    try {
      return await fetchApi.delete<SecretDto>(`${this.apiUrl}/${link}`)
    } catch (error) {
      throw error
    }
  }

  static async generateSecretPhrase(length: number): Promise<SecretDto> {
    try {
      return await fetchApi.get<SecretDto>(`${this.apiUrl}/generate/${length}`)
    } catch (error) {
      throw error
    }
  }
}
