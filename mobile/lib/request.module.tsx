import axios from 'axios'

export class ApiRequest {
  private Api = axios.create({
    baseURL: 'http://172.20.176.1:8080/api',
  })

  async ApiRequest(endpoint: string, payload: object) {
    const fullUrl = `${this.Api.defaults.baseURL}${endpoint}` 
    console.log('Calling API URL:', fullUrl)
    console.log('Payload:', payload) 
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
