import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, StopCircle } from 'lucide-react';

interface StreamingResponseProps {
  content: string;
  isStreaming: boolean;
  error: string | null;
  isComplete: boolean;
  onStop?: () => void;
}

export const StreamingResponse: React.FC<StreamingResponseProps> = ({
  content,
  isStreaming,
  error,
  isComplete,
  onStop,
}) => {
  if (!content && !isStreaming && !error) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          {isStreaming && (
            <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
          )}
          <span className="font-medium text-gray-900">
            {isStreaming ? 'AI Assistant is writing...' : 'Response'}
          </span>
        </div>
        
        {isStreaming && onStop && (
          <button
            onClick={onStop}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <StopCircle className="w-4 h-4" />
            <span>Stop</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {error ? (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-700 leading-relaxed"
              style={{ minHeight: isStreaming ? '20px' : 'auto' }}
            >
              {content}
              {isStreaming && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-2 h-4 bg-primary-600 ml-1"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {isComplete && content && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <p className="text-xs text-gray-500">
            ✓ Response completed • {content.length} characters
          </p>
        </div>
      )}
    </motion.div>
  );
};