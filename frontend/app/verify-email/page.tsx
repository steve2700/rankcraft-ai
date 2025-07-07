'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { api } from '../lib/api'

export default function VerifyEmail() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('registerEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      router.push('/register')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }
    
    setLoading(true)
    
    try {
      const result = await api.verifyEmail({ email, code })
      
      if (result.success) {
        setSuccess('Email verified successfully!')
        sessionStorage.removeItem('registerEmail')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        setError(result.error || 'Invalid or expired verification code')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  return (
    <AuthLayout 
      title="Verify Your Email" 
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Verification Code
          </label>
          <div className="relative">
            <Mail className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              className="auth-input pl-10 text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>
          <p className="text-slate-400 text-xs mt-2">
            Enter the 6-digit code from your email
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="auth-button flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              Verify Email
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>

        <div className="text-center space-y-2">
          <p className="text-slate-300 text-sm">
            Didn&apos;t receive the code?{' '}
            <button type="button" className="auth-link">
              Resend Code
            </button>
          </p>
          <p className="text-slate-300 text-sm">
            Wrong email?{' '}
            <Link href="/register" className="auth-link">
              Go back to registration
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
