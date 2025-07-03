import { jwtDecode } from 'jwt-decode'

interface JWTPayload {
  email: string
  exp: number
  iat: number
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('rankcraft_token')
}

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rankcraft_token', token)
  }
}

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rankcraft_token')
  }
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch {
    return false
  }
}

export const getUserFromToken = (token: string): { email: string } | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token)
    return { email: decoded.email }
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const token = getAuthToken()
  return token ? isTokenValid(token) : false
}
