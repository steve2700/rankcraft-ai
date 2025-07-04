'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { api } from '../lib/api'


export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const result = await api.requestPasswordReset(email)
      if (result.success) {
        setMessage('Check your email for the reset code.')
      } else {
        setError(result.error || 'Failed to send reset code.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to receive a reset code"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-10"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button
          type="submit"
          disabled={loading}
          className="auth-button flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              Send Code
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}

