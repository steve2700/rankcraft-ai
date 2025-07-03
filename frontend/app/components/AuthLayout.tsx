import { ReactNode } from 'react'
import { Zap } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="auth-card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">RankCraft AI</h1>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">{title}</h2>
          {subtitle && (
            <p className="text-slate-300 text-sm">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
