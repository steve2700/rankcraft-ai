const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rankcraft-ai.onrender.com';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface VerifyEmailData {
  email: string;
  code: string;
}

interface ResetPasswordData {
  email: string;
  code: string;
  new_password: string;
}

export const api = {
  register: async (data: RegisterData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message,
        data: result.data,
        error: result.error,
      };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  login: async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: {
            access_token: result.access_token,
            refresh_token: result.refresh_token,
          },
          message: result.message,
        };
      } else {
        return {
          success: false,
          error: result.error || 'Invalid email or password',
        };
      }
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  verifyEmail: async (data: VerifyEmailData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message,
        data: result.data,
        error: result.error,
      };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  requestPasswordReset: async (email: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/password-reset-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message,
        error: result.error,
      };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  resetPassword: async (
    email: string,
    code: string,
    new_password: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, new_password }),
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message,
        error: result.error,
      };
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  keywordSuggestions: async (query: string): Promise<ApiResponse<{
    query: string;
    suggestions: Array<{
      suggestion: string;
      search_volume: number;
      keyword_difficulty: number;
    }>;
  }>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/keywords/suggest?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch keyword suggestions');
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch keyword suggestions. Please try again.',
      };
    }
  },

  generateArticle: async (data: {
    keyword: string;
    length: string;
    tone: string;
  }): Promise<ApiResponse<{
    keyword: string;
    length: string;
    tone: string;
    article: string;
  }>> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rankcraft_token') : null;
      
      const response = await fetch(`${API_BASE_URL}/generate/article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate article');
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate article. Please try again.',
      };
    }
  },

  saveArticle: async (data: {
    keyword: string;
    length: string;
    tone: string;
    article: string;
  }): Promise<ApiResponse<{
    id: string;
    keyword: string;
    length: string;
    tone: string;
    article: string;
    user_id: string;
    created_at: string;
  }>> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rankcraft_token') : null;
      
      const response = await fetch(`${API_BASE_URL}/articles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save article');
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save article. Please try again.',
      };
    }
  },

  getUserArticles: async (): Promise<ApiResponse<Array<{
    id: string;
    keyword: string;
    length: string;
    tone: string;
    article: string;
    user_id: string;
    created_at: string;
  }>>> => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rankcraft_token') : null;
      
      const response = await fetch(`${API_BASE_URL}/articles/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch articles');
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles. Please try again.',
      };
    }
  },
};
