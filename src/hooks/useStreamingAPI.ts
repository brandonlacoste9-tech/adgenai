import { useState, useCallback, useRef } from 'react';

export interface StreamingOptions {
  endpoint: string;
  prompt: string;
  context?: string;
  tone?: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

export interface StreamingState {
  isStreaming: boolean;
  content: string;
  error: string | null;
  isComplete: boolean;
}

export const useStreamingAPI = () => {
  const [state, setState] = useState<StreamingState>({
    isStreaming: false,
    content: '',
    error: null,
    isComplete: false,
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStreaming = useCallback(async (options: StreamingOptions) => {
    // Reset state
    setState({
      isStreaming: true,
      content: '',
      error: null,
      isComplete: false,
    });

    try {
      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${options.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          prompt: options.prompt,
          context: options.context,
          tone: options.tone || 'friendly',
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setState(prev => ({
            ...prev,
            isStreaming: false,
            isComplete: true,
          }));
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setState(prev => ({
          ...prev,
          content: accumulatedContent,
        }));
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled
        setState(prev => ({
          ...prev,
          isStreaming: false,
          isComplete: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isStreaming: false,
          error: error instanceof Error ? error.message : 'An unknown error occurred',
          isComplete: false,
        }));
      }
    }
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isStreaming: false,
      content: '',
      error: null,
      isComplete: false,
    });
  }, []);

  return {
    ...state,
    startStreaming,
    stopStreaming,
    reset,
  };
};