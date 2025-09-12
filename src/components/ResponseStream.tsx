import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface ResponseStreamProps {
  content: string;
  isStreaming: boolean;
  onComplete?: () => void;
}

export const ResponseStream: React.FC<ResponseStreamProps> = ({
  content,
  isStreaming,
  onComplete
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle typing animation
  useEffect(() => {
    if (content && currentIndex < content.length) {
      intervalRef.current = setTimeout(() => {
        setDisplayedContent(content.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, 20 + Math.random() * 40); // Variable typing speed for natural feel
    } else if (currentIndex >= content.length && content && onComplete) {
      onComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [content, currentIndex, onComplete]);

  // Reset when new content arrives
  useEffect(() => {
    if (content === '') {
      setDisplayedContent('');
      setCurrentIndex(0);
    }
  }, [content]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedContent]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatContent = (text: string) => {
    // Basic markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-blue-500/20 px-1 py-0.5 rounded text-blue-300">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  if (!content && !isStreaming) {
    return null;
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-semibold text-white">AI Response</span>
          {isStreaming && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
        
        {content && (
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 text-sm text-gray-300 hover:text-white"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-h-96 overflow-y-auto custom-scrollbar"
      >
        {displayedContent ? (
          <div className="prose prose-invert max-w-none">
            <p 
              className="text-gray-200 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: formatContent(displayedContent) }}
            />
            {isStreaming && currentIndex < content.length && (
              <span className="inline-block w-2 h-5 bg-blue-400 animate-pulse ml-1" />
            )}
          </div>
        ) : isStreaming ? (
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>AI is thinking...</span>
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>AI response will appear here...</p>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      {isStreaming && content && (
        <div className="mt-3">
          <div className="w-full bg-white/10 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / content.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};