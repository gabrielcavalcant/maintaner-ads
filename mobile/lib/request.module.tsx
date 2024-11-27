import axios from 'axios'

export class ApiRequest {
  private Api = axios.create({
    baseURL: 'http://10.109.25.120:5033/api',
  })

  async ApiRequest(endpoint: string, payload: object) {
    try {
      const response = await this.Api.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response
    } catch (error: any) {
      return error.response
    }
  }
}
