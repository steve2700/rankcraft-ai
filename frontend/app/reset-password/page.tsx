'use client'

import { useState } from 'react'
import { Mail, Lock, KeyRound, ArrowRight } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { api } from '../lib/api'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const result = await api.resetPassword(email, code, newPassword)
      if (result.success) {
        setSuccess('Password reset successfully! Redirecting...')
        setTimeout(() => router.push('/login'), 2000)
      } else {
        setError(result.error || 'Invalid reset code or email.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email, code, and new password"
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

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Reset Code
          </label>
          <div className="relative">
            <KeyRound className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="auth-input pl-10"
              placeholder="Enter code from email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input pl-10"
              placeholder="New password"
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button
          type="submit"
          disabled={loading}
          className="auth-button flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              Reset Password
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}

