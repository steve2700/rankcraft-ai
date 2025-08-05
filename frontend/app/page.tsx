import Link from 'next/link'
import { 
  Zap, 
  Search, 
  FileText, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Users,
  TrendingUp,
  Target,
  Sparkles,
  Globe,
  Award,
  Clock
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">RankCraft AI</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200">
                Pricing
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors duration-200">
                Reviews
              </a>
              <Link 
                href="/login"
                className="text-slate-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <span className="text-green-300 text-sm font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered SEO Content Creation
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Create SEO Content That
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                Ranks & Converts
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate high-quality, SEO-optimized articles with AI. Research keywords, analyze content, 
              and dominate search rankings with RankCraft AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center text-lg"
              >
                Start Creating Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/login"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center text-lg"
              >
                Sign In
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-slate-300">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span>Free Trial Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-slate-300">Articles Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-300">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-slate-300">SEO Score Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-300">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need for SEO Success
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful AI tools to research, create, and optimize content that ranks higher in search results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Article Generation */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg w-fit mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Article Generation</h3>
              <p className="text-slate-300 mb-6">
                Generate high-quality, SEO-optimized articles in minutes. Choose length, tone, and target keywords for perfect content.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Multiple article lengths
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Professional writing tones
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  SEO-optimized structure
                </li>
              </ul>
            </div>

            {/* Keyword Research */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-lg w-fit mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Keyword Research</h3>
              <p className="text-slate-300 mb-6">
                Discover high-ranking keywords with search volume and difficulty metrics. Find opportunities your competitors miss.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Search volume data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Difficulty scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  AI-powered suggestions
                </li>
              </ul>
            </div>

            {/* SEO Analysis */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-lg w-fit mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">SEO Content Analysis</h3>
              <p className="text-slate-300 mb-6">
                Analyze your content for SEO performance. Get detailed scores and actionable recommendations for improvement.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Overall SEO scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Detailed recommendations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Keyword optimization
                </li>
              </ul>
            </div>

            {/* Content Management */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-lg w-fit mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Content Library</h3>
              <p className="text-slate-300 mb-6">
                Organize, edit, and manage all your content in one place. Search, filter, and export your articles easily.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Article management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Search & filtering
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Export capabilities
                </li>
              </ul>
            </div>

            {/* Performance Tracking */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-lg w-fit mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance Insights</h3>
              <p className="text-slate-300 mb-6">
                Track your content performance with detailed analytics and insights to improve your SEO strategy.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Content analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  SEO score tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Performance reports
                </li>
              </ul>
            </div>

            {/* AI Optimization */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-lg w-fit mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Optimization</h3>
              <p className="text-slate-300 mb-6">
                Let AI continuously optimize your content for better search rankings and user engagement.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Smart optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Continuous learning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Best practice updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How RankCraft AI Works
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Simple 3-step process to create SEO content that ranks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Research Keywords</h3>
              <p className="text-slate-300">
                Use our AI-powered keyword research tool to find high-ranking opportunities in your niche.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Generate Content</h3>
              <p className="text-slate-300">
                Create SEO-optimized articles with AI. Choose your target keyword, length, and writing tone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Optimize & Publish</h3>
              <p className="text-slate-300">
                Analyze your content with our SEO tool, make improvements, and publish for maximum rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Content Creators
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See what our users say about RankCraft AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "RankCraft AI has revolutionized my content creation process. I can now produce high-quality, SEO-optimized articles in minutes instead of hours."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">SM</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Mitchell</div>
                  <div className="text-slate-400 text-sm">Content Marketing Manager</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "The keyword research tool is incredibly accurate. I've seen a 300% increase in organic traffic since using RankCraft AI for my blog content."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">DJ</span>
                </div>
                <div>
                  <div className="text-white font-semibold">David Johnson</div>
                  <div className="text-slate-400 text-sm">Digital Marketing Specialist</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "As a freelance writer, RankCraft AI has become my secret weapon. The SEO analysis feature helps me deliver better results for my clients."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">ER</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Emily Rodriguez</div>
                  <div className="text-slate-400 text-sm">Freelance Content Writer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the plan that fits your content creation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <div className="text-slate-300">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  5 articles per month
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Basic keyword research
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  SEO analysis
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Email support
                </li>
              </ul>
              <Link 
                href="/register"
                className="w-full px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
              >
                Get Started Free
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-500/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-semibold">Most Popular</span>
                </div>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">$29</div>
                <div className="text-slate-300">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  50 articles per month
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Advanced keyword research
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Detailed SEO analysis
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Content templates
                </li>
              </ul>
              <Link 
                href="/register"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Start Pro Trial
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-2">$99</div>
                <div className="text-slate-300">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Unlimited articles
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Advanced AI features
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  White-label options
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  24/7 phone support
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  Custom integrations
                </li>
              </ul>
              <Link 
                href="/register"
                className="w-full px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Dominate Search Rankings?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of content creators who trust RankCraft AI to boost their SEO performance
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div className="flex items-center text-slate-300">
              <Clock className="h-5 w-5 mr-2" />
              <span>Setup takes less than 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-bold text-white">RankCraft AI</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                The ultimate AI-powered SEO content creation platform. Generate, optimize, and rank higher with intelligent content tools.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-slate-300">
                  <Award className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>Trusted by 500+ creators</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><Link href="/register" className="text-slate-300 hover:text-white transition-colors duration-200">Free Trial</Link></li>
                <li><Link href="/login" className="text-slate-300 hover:text-white transition-colors duration-200">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-slate-300">
              © 2025 RankCraft AI. All rights reserved. Built with ❤️ for content creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
