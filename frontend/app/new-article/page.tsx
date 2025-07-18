'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  ArrowLeft,
  Loader2,
  Wand2,
  Copy,
  Download,
  Eye,
  Settings,
  Sparkles
} from 'lucide-react';
import { getAuthToken, isAuthenticated } from '../lib/auth';
import { api } from '../lib/api';

interface ArticleData {
  keyword: string;
  length: string;
  tone: string;
  article: string;
}

export default function NewArticle() {
  const [keyword, setKeyword] = useState('');
  const [length, setLength] = useState('medium');
  const [tone, setTone] = useState('professional');
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '500-800 words' },
    { value: 'medium', label: 'Medium', description: '800-1200 words' },
    { value: 'long', label: 'Long', description: '1200+ words' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
    { value: 'informative', label: 'Informative', description: 'Educational and detailed' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim() || keyword.trim().length < 2) {
      setError('Please enter a keyword with at least 2 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await api.generateArticle({
        keyword: keyword.trim(),
        length,
        tone
      });
      
      if (result.success && result.data) {
        setArticleData(result.data);
        setShowPreview(true);
      } else {
        setError(result.error || 'Failed to generate article');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (articleData?.article) {
      navigator.clipboard.writeText(articleData.article);
    }
  };

  const downloadArticle = () => {
    if (articleData?.article) {
      const blob = new Blob([articleData.article], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${articleData.keyword.replace(/\s+/g, '-')}-article.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const saveArticle = async () => {
    if (!articleData) return;
    
    setSaving(true);
    setSaveSuccess(false);
    setError('');
    
    try {
      const result = await api.saveArticle({
        keyword: articleData.keyword,
        length: articleData.length,
        tone: articleData.tone,
        article: articleData.article
      });
      
      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to save article');
      }
    } catch (err) {
      setError('An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const wordCount = articleData?.article ? articleData.article.split(/\s+/).length : 0;

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
              <h1 className="ml-3 text-xl font-bold text-white">Create New Article</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Article Generation Form */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <Wand2 className="h-6 w-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">AI Article Generator</h2>
              </div>
              
              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Keyword Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Target Keyword *
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your target keyword (e.g., granite installation)"
                    minLength={2}
                    required
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    The main keyword you want to rank for
                  </p>
                </div>

                {/* Length Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Article Length
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {lengthOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          length === option.value
                            ? 'bg-green-500/20 border-green-400/50 text-white'
                            : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="length"
                          value={option.value}
                          checked={length === option.value}
                          onChange={(e) => setLength(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm opacity-75">{option.description}</div>
                        </div>
                        {length === option.value && (
                          <Sparkles className="h-5 w-5 text-green-400" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Writing Tone
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {toneOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          tone === option.value
                            ? 'bg-blue-500/20 border-blue-400/50 text-white'
                            : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tone"
                          value={option.value}
                          checked={tone === option.value}
                          onChange={(e) => setTone(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm opacity-75">{option.description}</div>
                        </div>
                        {tone === option.value && (
                          <Settings className="h-5 w-5 text-blue-400" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="text-red-300 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5 mr-2" />
                      Generate Article
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Article Stats */}
            {articleData && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Article Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-2xl font-bold text-white">{wordCount}</div>
                    <div className="text-sm text-slate-300">Words</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-2xl font-bold text-white capitalize">{articleData.tone}</div>
                    <div className="text-sm text-slate-300">Tone</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Article Preview */}
          <div className="space-y-6">
            {articleData ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Article Preview
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={downloadArticle}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="Download as Markdown"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={saveArticle}
                        disabled={saving}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        title="Save to library"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : (
                          'Save Article'
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-300">
                    <span>Keyword: <span className="text-white font-medium">{articleData.keyword}</span></span>
                    <span>Length: <span className="text-white font-medium capitalize">{articleData.length}</span></span>
                  </div>
                </div>
                
                {saveSuccess && (
                  <div className="px-6 py-3 bg-green-500/10 border-t border-green-500/20">
                    <div className="text-green-300 text-sm flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Article saved successfully to your library!
                    </div>
                  </div>
                )}
                
                <div className="p-6 max-h-96 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed font-sans">
                      {articleData.article}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Create Amazing Content?
                </h3>
                <p className="text-slate-300 mb-6">
                  Fill out the form on the left to generate your SEO-optimized article with AI assistance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Wand2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">AI-Powered</h4>
                    <p className="text-slate-300 text-sm">
                      Advanced AI generates high-quality content
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Settings className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">SEO Optimized</h4>
                    <p className="text-slate-300 text-sm">
                      Content optimized for search engines
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


