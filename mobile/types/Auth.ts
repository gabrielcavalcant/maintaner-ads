export type AuthToken = {
  accessToken: string
  refreshToken: string
  statusCode?: number
  permission?: string[]
}

export type User = {
  accessToken: any
  sub: string
  email: string
  fullName: string
  iat: number
  exp: number
  permission: string[]
}
