'use client';

import { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Code,
  Undo,
  Redo,
  Type,
  Palette,
  Save,
  RefreshCw,
  Zap,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
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
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (articleData) {
      setEditedContent(articleData.article);
    }
  }, [articleData]);

  const lengthOptions = [
    { 
      value: 'short', 
      label: 'Short Article', 
      description: '500-800 words',
      icon: '📝',
      time: '2-3 min read',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      value: 'medium', 
      label: 'Medium Article', 
      description: '800-1200 words',
      icon: '📄',
      time: '4-6 min read',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      value: 'long', 
      label: 'Long Article', 
      description: '1200+ words',
      icon: '📚',
      time: '7+ min read',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const toneOptions = [
    { 
      value: 'professional', 
      label: 'Professional', 
      description: 'Formal and authoritative tone',
      icon: '💼',
      example: 'Industry expertise and credibility',
      color: 'from-slate-500 to-gray-600'
    },
    { 
      value: 'casual', 
      label: 'Casual', 
      description: 'Friendly and conversational',
      icon: '😊',
      example: 'Hey there! Let\'s chat about...',
      color: 'from-orange-500 to-red-600'
    },
    { 
      value: 'informative', 
      label: 'Informative', 
      description: 'Educational and detailed',
      icon: '🎓',
      example: 'Learn the fundamentals of...',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      value: 'persuasive', 
      label: 'Persuasive', 
      description: 'Compelling and convincing',
      icon: '🎯',
      example: 'Transform your business with...',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim() || keyword.trim().length < 2) {
      setError('Please enter a keyword with at least 2 characters');
      return;
    }

    setLoading(true);
    setError('');
    setGenerationProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);
    
    try {
      const result = await api.generateArticle({
        keyword: keyword.trim(),
        length,
        tone
      });
      
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
      if (result.success && result.data) {
        setArticleData(result.data);
        setShowPreview(true);
        setTimeout(() => setGenerationProgress(0), 1000);
      } else {
        setError(result.error || 'Failed to generate article');
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = editedContent.substring(start, end);
      setSelectedText(selected);
    }
  };

  const applyFormatting = (format: string) => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = editedContent.substring(start, end);
    
    if (!selectedText) return;
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'link':
        formattedText = `[${selectedText}](https://example.com)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = editedContent.substring(0, start) + formattedText + editedContent.substring(end);
    setEditedContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, start + formattedText.length);
      }
    }, 0);
  };

  const insertElement = (element: string) => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    let insertText = '';
    
    switch (element) {
      case 'heading':
        insertText = '\n## Heading\n';
        break;
      case 'list':
        insertText = '\n- List item\n- List item\n';
        break;
      case 'orderedList':
        insertText = '\n1. First item\n2. Second item\n';
        break;
      case 'image':
        insertText = '\n![Alt text](image-url)\n';
        break;
      default:
        insertText = '';
    }
    
    const newContent = editedContent.substring(0, start) + insertText + editedContent.substring(start);
    setEditedContent(newContent);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + insertText.length, start + insertText.length);
      }
    }, 0);
  };

  const copyToClipboard = () => {
    const contentToCopy = editMode ? editedContent : articleData?.article;
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy);
    }
  };

  const downloadArticle = () => {
    const contentToDownload = editMode ? editedContent : articleData?.article;
    if (contentToDownload && articleData) {
      const blob = new Blob([contentToDownload], { type: 'text/markdown' });
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
      const contentToSave = editMode ? editedContent : articleData.article;
      const result = await api.saveArticle({
        keyword: articleData.keyword,
        length: articleData.length,
        tone: articleData.tone,
        article: contentToSave
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

  const regenerateArticle = async () => {
    if (!articleData) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await api.generateArticle({
        keyword: articleData.keyword,
        length: articleData.length,
        tone: articleData.tone
      });
      
      if (result.success && result.data) {
        setArticleData(result.data);
        setEditedContent(result.data.article);
        setEditMode(false);
      } else {
        setError(result.error || 'Failed to regenerate article');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = editMode ? editedContent.split(/\s+/).length : (articleData?.article ? articleData.article.split(/\s+/).length : 0);
  const charCount = editMode ? editedContent.length : (articleData?.article ? articleData.article.length : 0);
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
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
              <h1 className="ml-3 text-xl font-bold text-white">AI Article Generator</h1>
            </div>
            
            {articleData && (
              <div className="flex items-center space-x-2">
                <div className="text-sm text-slate-300">
                  {wordCount} words • {readingTime} min read
                </div>
              </div>
            )}
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
                <h2 className="text-2xl font-bold text-white">Create Your Article</h2>
              </div>
              
              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Keyword Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Target Keyword *
                  </label>
                  <div className="relative">
                    <Target className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your target keyword (e.g., best SEO tools 2024)"
                      minLength={2}
                      required
                    />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    The main keyword you want to rank for in search engines
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
                        className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 group ${
                          length === option.value
                            ? `bg-gradient-to-r ${option.color}/20 border-white/30 text-white shadow-lg`
                            : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/30'
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
                        <div className="flex items-center flex-1">
                          <div className="text-2xl mr-3">{option.icon}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{option.label}</div>
                            <div className="text-sm opacity-75 mb-1">{option.description}</div>
                            <div className="text-xs opacity-60 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {option.time}
                            </div>
                          </div>
                        </div>
                        {length === option.value && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Writing Tone & Style
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {toneOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 group ${
                          tone === option.value
                            ? `bg-gradient-to-r ${option.color}/20 border-white/30 text-white shadow-lg`
                            : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/30'
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
                        <div className="flex items-center flex-1">
                          <div className="text-2xl mr-3">{option.icon}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg">{option.label}</div>
                            <div className="text-sm opacity-75 mb-1">{option.description}</div>
                            <div className="text-xs opacity-60 italic">"{option.example}"</div>
                          </div>
                        </div>
                        {tone === option.value && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                    <div className="text-red-300 text-sm">{error}</div>
                  </div>
                )}

                {/* Generation Progress */}
                {loading && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Generating your article...</span>
                      <span>{Math.round(generationProgress)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Generate Article with AI
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Article Stats */}
            {articleData && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Article Analytics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{wordCount}</div>
                    <div className="text-sm text-slate-300">Words</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{readingTime}</div>
                    <div className="text-sm text-slate-300">Min Read</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white capitalize">{articleData.tone}</div>
                    <div className="text-sm text-slate-300">Tone</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{charCount}</div>
                    <div className="text-sm text-slate-300">Characters</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Article Preview/Editor */}
          <div className="space-y-6">
            {articleData ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      {editMode ? (
                        <>
                          <Type className="h-5 w-5 mr-2" />
                          Edit Article
                        </>
                      ) : (
                        <>
                          <Eye className="h-5 w-5 mr-2" />
                          Article Preview
                        </>
                      )}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          editMode 
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                            : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                        title={editMode ? "Preview mode" : "Edit mode"}
                      >
                        {editMode ? <Eye className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={regenerateArticle}
                        disabled={loading}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="Regenerate article"
                      >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      </button>
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
                          <Save className="h-4 w-4 mr-1" />
                        )}
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-300">
                    <span>Keyword: <span className="text-white font-medium">{articleData.keyword}</span></span>
                    <span>Length: <span className="text-white font-medium capitalize">{articleData.length}</span></span>
                    <span>Tone: <span className="text-white font-medium capitalize">{articleData.tone}</span></span>
                  </div>
                </div>
                
                {/* Formatting Toolbar */}
                {editMode && (
                  <div className="px-6 py-3 bg-white/5 border-b border-white/20">
                    <div className="flex items-center space-x-1 flex-wrap gap-2">
                      <div className="flex items-center space-x-1 border-r border-white/20 pr-3">
                        <button
                          onClick={() => applyFormatting('bold')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => applyFormatting('italic')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => applyFormatting('underline')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Underline"
                        >
                          <Underline className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1 border-r border-white/20 pr-3">
                        <button
                          onClick={() => insertElement('heading')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Heading"
                        >
                          <Type className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => applyFormatting('quote')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Quote"
                        >
                          <Quote className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => applyFormatting('code')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Code"
                        >
                          <Code className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1 border-r border-white/20 pr-3">
                        <button
                          onClick={() => insertElement('list')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => insertElement('orderedList')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Numbered List"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => applyFormatting('link')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Link"
                        >
                          <Link className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => insertElement('image')}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                          title="Image"
                        >
                          <Image className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {saveSuccess && (
                  <div className="px-6 py-3 bg-green-500/10 border-b border-green-500/20">
                    <div className="text-green-300 text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Article saved successfully to your library!
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <textarea
                        ref={textareaRef}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        onSelect={handleTextSelection}
                        className="w-full h-96 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm leading-relaxed"
                        placeholder="Edit your article content here..."
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Use the toolbar above to format your text</span>
                        <span>{editedContent.length} characters</span>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed font-sans">
                        {articleData.article}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Ready to Create Amazing Content?
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Fill out the form to generate your SEO-optimized article with AI assistance and advanced editing features.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Wand2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">AI-Powered</h4>
                    <p className="text-slate-300 text-sm">
                      Advanced AI generates high-quality content
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <Type className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-medium text-white mb-1">Rich Editor</h4>
                    <p className="text-slate-300 text-sm">
                      Format text with bold, italic, and more
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
