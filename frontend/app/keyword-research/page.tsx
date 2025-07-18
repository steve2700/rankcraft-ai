'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  Target, 
  ArrowLeft,
  Loader2,
  Copy,
  ExternalLink,
  Filter,
  SortDesc
} from 'lucide-react';
import { getAuthToken, isAuthenticated } from '../lib/auth';
import { api } from '../lib/api';

interface KeywordSuggestion {
  suggestion: string;
  search_volume: number;
  keyword_difficulty: number;
}

interface KeywordData {
  query: string;
  suggestions: KeywordSuggestion[];
}

export default function KeywordResearch() {
  const [query, setQuery] = useState('');
  const [keywordData, setKeywordData] = useState<KeywordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'difficulty' | 'alphabetical'>('volume');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || query.trim().length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await api.keywordSuggestions(query.trim());
      
      if (result.success && result.data) {
        setKeywordData(result.data);
      } else {
        setError(result.error || 'Failed to fetch keyword suggestions');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (difficulty <= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 30) return 'Easy';
    if (difficulty <= 60) return 'Medium';
    return 'Hard';
  };

  const formatSearchVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredAndSortedSuggestions = keywordData?.suggestions
    ?.filter(suggestion => {
      if (filterDifficulty === 'all') return true;
      if (filterDifficulty === 'easy') return suggestion.keyword_difficulty <= 30;
      if (filterDifficulty === 'medium') return suggestion.keyword_difficulty > 30 && suggestion.keyword_difficulty <= 60;
      if (filterDifficulty === 'hard') return suggestion.keyword_difficulty > 60;
      return true;
    })
    ?.sort((a, b) => {
      if (sortBy === 'volume') return b.search_volume - a.search_volume;
      if (sortBy === 'difficulty') return a.keyword_difficulty - b.keyword_difficulty;
      if (sortBy === 'alphabetical') return a.suggestion.localeCompare(b.suggestion);
      return 0;
    }) || [];

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
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">Keyword Research</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Discover High-Ranking Keywords
            </h2>
            <p className="text-slate-300 mb-6">
              Enter a keyword or phrase to get AI-powered suggestions with search volume and difficulty metrics
            </p>
            
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter keyword (e.g., carpenter in mid)"
                    minLength={2}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Research
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 text-red-300 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {keywordData && (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Results for "{keywordData.query}"
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Found {filteredAndSortedSuggestions.length} keyword suggestions
                  </p>
                </div>
                
                {/* Filters */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value as any)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="all">All Difficulty</option>
                      <option value="easy">Easy (≤30)</option>
                      <option value="medium">Medium (31-60)</option>
                      <option value="hard">Hard (&gt;60)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <SortDesc className="h-4 w-4 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="volume">Search Volume</option>
                      <option value="difficulty">Difficulty</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Grid */}
            <div className="grid gap-4">
              {filteredAndSortedSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-white">
                          {suggestion.suggestion}
                        </h4>
                        <button
                          onClick={() => copyToClipboard(suggestion.suggestion)}
                          className="p-1 text-slate-400 hover:text-white transition-colors duration-200"
                          title="Copy keyword"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(suggestion.suggestion)}`, '_blank')}
                          className="p-1 text-slate-400 hover:text-white transition-colors duration-200"
                          title="Search on Google"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                          <span className="text-slate-300 text-sm">Search Volume:</span>
                          <span className="text-white font-semibold">
                            {formatSearchVolume(suggestion.search_volume)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          <span className="text-slate-300 text-sm">Difficulty:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(suggestion.keyword_difficulty)}`}>
                            {suggestion.keyword_difficulty} - {getDifficultyLabel(suggestion.keyword_difficulty)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {suggestion.keyword_difficulty}
                        </div>
                        <div className="text-xs text-slate-400">
                          Difficulty Score
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedSuggestions.length === 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No keywords found
                </h3>
                <p className="text-slate-300">
                  Try adjusting your filters or search for a different keyword.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!keywordData && !loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
            <Search className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Start Your Keyword Research
            </h3>
            <p className="text-slate-300 mb-6">
              Enter a keyword above to discover related suggestions with search volume and difficulty metrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-medium text-white mb-1">Search Volume</h4>
                <p className="text-slate-300 text-sm">
                  Monthly search volume data
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-medium text-white mb-1">Difficulty Score</h4>
                <p className="text-slate-300 text-sm">
                  Ranking difficulty analysis
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-medium text-white mb-1">AI Suggestions</h4>
                <p className="text-slate-300 text-sm">
                  Smart keyword recommendations
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
