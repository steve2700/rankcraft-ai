'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  SortDesc,
  Copy,
  Download
} from 'lucide-react';
import { getAuthToken, isAuthenticated } from '../lib/auth';
import { api } from '../lib/api';

interface Article {
  id: string;
  keyword: string;
  length: string;
  tone: string;
  article: string;
  user_id: string;
  created_at: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'keyword'>('newest');
  const [filterLength, setFilterLength] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchArticles();
  }, [router]);

  const fetchArticles = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await api.getUserArticles();
      
      if (result.success && result.data) {
        setArticles(result.data);
      } else {
        setError(result.error || 'Failed to fetch articles');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWordCount = (article: string) => {
    return article.split(/\s+/).length;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadArticle = (article: Article) => {
    const blob = new Blob([article.article], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.keyword.replace(/\s+/g, '-')}-article.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedArticles = articles
    .filter(article => {
      const matchesSearch = article.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.article.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLength = filterLength === 'all' || article.length === filterLength;
      return matchesSearch && matchesLength;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'keyword') return a.keyword.localeCompare(b.keyword);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">My Articles</h1>
            </div>
            
            <button
              onClick={() => router.push('/new-article')}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="Search articles by keyword or content..."
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <select
                    value={filterLength}
                    onChange={(e) => setFilterLength(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="all">All Lengths</option>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <SortDesc className="h-4 w-4 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="keyword">By Keyword</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 text-red-300 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {filteredAndSortedArticles.length > 0 ? (
          <div className="grid gap-6">
            {filteredAndSortedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {article.keyword}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-300 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(article.created_at)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getWordCount(article.article)} words
                      </div>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium capitalize">
                        {article.length}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium capitalize">
                        {article.tone}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm line-clamp-2">
                      {article.article.substring(0, 200)}...
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      title="View article"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(article.article)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      title="Copy article"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => downloadArticle(article)}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      title="Download article"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery || filterLength !== 'all' ? 'No articles found' : 'No articles yet'}
            </h3>
            <p className="text-slate-300 mb-6">
              {searchQuery || filterLength !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'Create your first AI-generated article to get started.'
              }
            </p>
            <button
              onClick={() => router.push('/new-article')}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center mx-auto"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Article
            </button>
          </div>
        )}
      </main>

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedArticle.keyword}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-300 mt-2">
                    <span className="capitalize">{selectedArticle.length} • {selectedArticle.tone}</span>
                    <span>{getWordCount(selectedArticle.article)} words</span>
                    <span>{formatDate(selectedArticle.created_at)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed font-sans">
                  {selectedArticle.article}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
