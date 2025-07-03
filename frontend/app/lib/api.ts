const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rankcraft-ai.onrender.com'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface RegisterData {
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface VerifyEmailData {
  email: string
  code: string
}

export const api = {
  register: async (data: RegisterData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      }
    }
  },

  login: async (data: LoginData): Promise<ApiResponse<{ token: string }>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      }
    }
  },

  verifyEmail: async (data: VerifyEmailData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      }
    }
  },
}
