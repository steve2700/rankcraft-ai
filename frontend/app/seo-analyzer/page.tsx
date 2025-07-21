'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  FileText,
  Eye,
  Lightbulb,
  BarChart3,
  TrendingUp,
  Hash,
  Type,
  BookOpen,
  Zap
} from 'lucide-react';
import { getAuthToken, isAuthenticated } from '../lib/auth';
import { api } from '../lib/api';

interface SEOAnalysis {
  overall_score: number;
  title_analysis: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  meta_description_analysis: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  content_analysis: {
    score: number;
    keyword_density: number;
    word_count: number;
    readability_score: number;
    issues: string[];
    suggestions: string[];
  };
  keyword_analysis: {
    score: number;
    keyword_in_title: boolean;
    keyword_in_meta: boolean;
    keyword_in_content: boolean;
    keyword_frequency: number;
    issues: string[];
    suggestions: string[];
  };
}

export default function SEOAnalyzer() {
  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [keyword, setKeyword] = useState('');
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !metaDescription.trim() || !content.trim() || !keyword.trim()) {
      setError('All fields are required for accurate SEO analysis');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await api.seoAnalyze({
        title: title.trim(),
        meta_description: metaDescription.trim(),
        content: content.trim(),
        keyword: keyword.trim()
      });
      
      if (result.success && result.data) {
        setAnalysis(result.data);
      } else {
        setError(result.error || 'Failed to analyze SEO');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">SEO Analyzer</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Form */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">SEO Content Analysis</h2>
              </div>
              
              <form onSubmit={handleAnalyze} className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Page Title *
                  </label>
                  <div className="relative">
                    <Type className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your page title"
                      maxLength={60}
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {title.length}/60 characters (recommended: 50-60)
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Meta Description *
                  </label>
                  <div className="relative">
                    <FileText className="h-5 w-5 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter your meta description"
                      maxLength={160}
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {metaDescription.length}/160 characters (recommended: 150-160)
                  </p>
                </div>

                {/* Target Keyword */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Target Keyword *
                  </label>
                  <div className="relative">
                    <Hash className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your target keyword"
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    The main keyword you want to rank for
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Content *
                  </label>
                  <div className="relative">
                    <BookOpen className="h-5 w-5 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Paste your content here for analysis..."
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {content.split(/\s+/).filter(word => word.length > 0).length} words
                  </p>
                </div>

                {error && (
                  <div className="text-red-300 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Analyzing SEO...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Analyze SEO
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Overall Score */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getOverallScoreColor(analysis.overall_score)} mb-4`}>
                      <span className="text-3xl font-bold text-white">{analysis.overall_score}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Overall SEO Score</h3>
                    <p className="text-slate-300">
                      {analysis.overall_score >= 80 ? 'Excellent SEO optimization!' : 
                       analysis.overall_score >= 60 ? 'Good SEO with room for improvement' : 
                       'Needs significant SEO improvements'}
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-4">
                  {/* Title Analysis */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Type className="h-5 w-5 text-blue-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Title Analysis</h4>
                      </div>
                      <div className={`flex items-center px-3 py-1 rounded-full border ${getScoreColor(analysis.title_analysis.score)}`}>
                        {getScoreIcon(analysis.title_analysis.score)}
                        <span className="ml-2 font-semibold">{analysis.title_analysis.score}</span>
                      </div>
                    </div>
                    
                    {analysis.title_analysis.issues.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-red-300 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Issues Found
                        </h5>
                        <ul className="space-y-1">
                          {analysis.title_analysis.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysis.title_analysis.suggestions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-300 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Suggestions
                        </h5>
                        <ul className="space-y-1">
                          {analysis.title_analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Meta Description Analysis */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-green-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Meta Description Analysis</h4>
                      </div>
                      <div className={`flex items-center px-3 py-1 rounded-full border ${getScoreColor(analysis.meta_description_analysis.score)}`}>
                        {getScoreIcon(analysis.meta_description_analysis.score)}
                        <span className="ml-2 font-semibold">{analysis.meta_description_analysis.score}</span>
                      </div>
                    </div>
                    
                    {analysis.meta_description_analysis.issues.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-red-300 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Issues Found
                        </h5>
                        <ul className="space-y-1">
                          {analysis.meta_description_analysis.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysis.meta_description_analysis.suggestions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-300 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Suggestions
                        </h5>
                        <ul className="space-y-1">
                          {analysis.meta_description_analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Content Analysis */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Content Analysis</h4>
                      </div>
                      <div className={`flex items-center px-3 py-1 rounded-full border ${getScoreColor(analysis.content_analysis.score)}`}>
                        {getScoreIcon(analysis.content_analysis.score)}
                        <span className="ml-2 font-semibold">{analysis.content_analysis.score}</span>
                      </div>
                    </div>
                    
                    {/* Content Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-lg font-bold text-white">{analysis.content_analysis.word_count}</div>
                        <div className="text-xs text-slate-400">Word Count</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-lg font-bold text-white">{analysis.content_analysis.keyword_density.toFixed(1)}%</div>
                        <div className="text-xs text-slate-400">Keyword Density</div>
                      </div>
                    </div>
                    
                    {analysis.content_analysis.issues.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-red-300 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Issues Found
                        </h5>
                        <ul className="space-y-1">
                          {analysis.content_analysis.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysis.content_analysis.suggestions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-300 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Suggestions
                        </h5>
                        <ul className="space-y-1">
                          {analysis.content_analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Keyword Analysis */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Hash className="h-5 w-5 text-yellow-400 mr-2" />
                        <h4 className="text-lg font-semibold text-white">Keyword Analysis</h4>
                      </div>
                      <div className={`flex items-center px-3 py-1 rounded-full border ${getScoreColor(analysis.keyword_analysis.score)}`}>
                        {getScoreIcon(analysis.keyword_analysis.score)}
                        <span className="ml-2 font-semibold">{analysis.keyword_analysis.score}</span>
                      </div>
                    </div>
                    
                    {/* Keyword Presence */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className={`p-3 rounded-lg border ${analysis.keyword_analysis.keyword_in_title ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="text-center">
                          {analysis.keyword_analysis.keyword_in_title ? 
                            <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-1" /> :
                            <XCircle className="h-6 w-6 text-red-400 mx-auto mb-1" />
                          }
                          <div className="text-xs text-slate-300">In Title</div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg border ${analysis.keyword_analysis.keyword_in_meta ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="text-center">
                          {analysis.keyword_analysis.keyword_in_meta ? 
                            <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-1" /> :
                            <XCircle className="h-6 w-6 text-red-400 mx-auto mb-1" />
                          }
                          <div className="text-xs text-slate-300">In Meta</div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg border ${analysis.keyword_analysis.keyword_in_content ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="text-center">
                          {analysis.keyword_analysis.keyword_in_content ? 
                            <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-1" /> :
                            <XCircle className="h-6 w-6 text-red-400 mx-auto mb-1" />
                          }
                          <div className="text-xs text-slate-300">In Content</div>
                        </div>
                      </div>
                    </div>
                    
                    {analysis.keyword_analysis.issues.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-red-300 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Issues Found
                        </h5>
                        <ul className="space-y-1">
                          {analysis.keyword_analysis.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysis.keyword_analysis.suggestions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-green-300 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          Suggestions
                        </h5>
                        <ul className="space-y-1">
                          {analysis.keyword_analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-slate-300 flex items-start">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                <Search className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Analyze Your SEO?
                </h3>
                <p className="text-slate-300 mb-6">
                  Fill out the form to get a comprehensive SEO analysis of your content with actionable insights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Detailed Analysis</h4>
                    <p className="text-slate-300 text-sm">
                      Comprehensive SEO scoring
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Lightbulb className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Smart Suggestions</h4>
                    <p className="text-slate-300 text-sm">
                      Actionable improvement tips
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
