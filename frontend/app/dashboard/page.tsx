'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  LogOut, 
  FileText, 
  Search, 
  TrendingUp, 
  Settings,
  Plus,
  BarChart3,
  Clock,
  Star
} from 'lucide-react'
import { getAuthToken, getUserFromToken, removeAuthToken, isAuthenticated } from '../lib/auth'

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const token = getAuthToken()
    if (token) {
      const userData = getUserFromToken(token)
      setUser(userData)
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    removeAuthToken()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">RankCraft AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-sm">
                Welcome, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to RankCraft AI
          </h2>
          <p className="text-slate-300 text-lg">
            Your AI-powered SEO content creation platform
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => router.push('/new-article')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">New Article</h3>
            <p className="text-slate-300 text-sm">
              Create SEO-optimized content with AI assistance
            </p>
          </div>

          <div 
            onClick={() => router.push('/keyword-research')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Keyword Research</h3>
            <p className="text-slate-300 text-sm">
              Discover high-ranking keywords for your niche
            </p>
          </div>

          <div 
            onClick={() => router.push('/seo-analyzer')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SEO Analyzer</h3>
            <p className="text-slate-300 text-sm">
              Analyze and optimize your content for SEO
            </p>
          </div>

          <div 
            onClick={() => router.push('/settings')}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Settings</h3>
            <p className="text-slate-300 text-sm">
              Customize your account and preferences
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Articles
                </h3>
                <button 
                  onClick={() => router.push('/articles')}
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Getting Started with SEO in 2024
                      </h4>
                      <p className="text-slate-300 text-sm mb-2">
                        A comprehensive guide to modern SEO techniques...
                      </p>
                      <div className="flex items-center text-xs text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        2 hours ago
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-slate-300">4.8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Advanced Keyword Research Strategies
                      </h4>
                      <p className="text-slate-300 text-sm mb-2">
                        Unlock the power of long-tail keywords and semantic search...
                      </p>
                      <div className="flex items-center text-xs text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        1 day ago
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-slate-300">4.9</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Content Optimization Best Practices
                      </h4>
                      <p className="text-slate-300 text-sm mb-2">
                        Learn how to structure your content for maximum impact...
                      </p>
                      <div className="flex items-center text-xs text-slate-400">
                        <Clock className="h-3 w-3 mr-1" />
                        3 days ago
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-slate-300">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Articles Created</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Keywords Researched</span>
                  <span className="text-white font-semibold">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Avg. Reading Time</span>
                  <span className="text-white font-semibold">8.5 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">SEO Score</span>
                  <span className="text-green-400 font-semibold">94%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Upgrade to Pro
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                Unlock advanced features and unlimited content generation
              </p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
