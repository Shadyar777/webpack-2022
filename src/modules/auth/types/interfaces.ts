export interface CredentialsState {
  accessToken: string
  expiresIn: number
  refreshExpiresIn: number
  refreshToken: string
  refreshTokenExpDate: string
  scope: string
  sessionState: string
  tokenType: string
}

export interface AuthState {
  loading: boolean
  error: any
}

