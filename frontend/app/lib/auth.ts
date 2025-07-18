import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rankcraft-ai.onrender.com'

interface JWTPayload {
  email: string
  exp: number
  iat: number
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('rankcraft_token')
}

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('rankcraft_refresh')
}

export const setAuthToken = (accessToken: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rankcraft_token', accessToken)
    localStorage.setItem('rankcraft_refresh', refreshToken)
  }
}

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('rankcraft_token')
    localStorage.removeItem('rankcraft_refresh')
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

export const refreshAuthToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    const data = await res.json()
    if (res.ok && data.access_token) {
      setAuthToken(data.access_token, refreshToken)
      return true
    }

    return false
  } catch {
    return false
  }
}

