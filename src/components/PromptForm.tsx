import React, { useState } from 'react';
import { Send, Sparkles, Brain, Target } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (prompt: string, context: string, tone: string) => void;
  isLoading: boolean;
  businessFunction: string;
}

const toneOptions = [
  { value: 'professional', label: 'Professional', icon: Target, description: 'Formal and business-focused' },
  { value: 'creative', label: 'Creative', icon: Sparkles, description: 'Innovative and imaginative' },
  { value: 'friendly', label: 'Friendly', icon: Brain, description: 'Approachable and conversational' },
  { value: 'analytical', label: 'Analytical', icon: Target, description: 'Data-driven and logical' },
];

export const PromptForm: React.FC<PromptFormProps> = ({
  onSubmit,
  isLoading,
  businessFunction
}) => {
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('professional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim(), context.trim(), tone);
    }
  };

  const placeholderText = {
    'content-creation': 'Describe the content you want to create (e.g., "Blog post about sustainable business practices")',
    'advertising': 'Describe your advertising goal (e.g., "Facebook ad campaign for eco-friendly products")',
    'data-analysis': 'Describe the data you want to analyze (e.g., "Customer retention metrics for Q4")',
    'customer-service': 'Describe the customer service scenario (e.g., "Handle complaints about delayed deliveries")',
    'strategy': 'Describe your strategic challenge (e.g., "Expansion strategy for European markets")',
    'market-research': 'Describe what you want to research (e.g., "Target audience for AI productivity tools")'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Main Prompt Input */}
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-semibold text-gray-200">
          What would you like assistance with?
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholderText[businessFunction as keyof typeof placeholderText] || 'Describe your request...'}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-300"
          rows={3}
          required
        />
      </div>

      {/* Context Input */}
      <div className="space-y-2">
        <label htmlFor="context" className="block text-sm font-semibold text-gray-200">
          Additional Context <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Provide any relevant background information, constraints, or specific requirements..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all duration-300"
          rows={2}
        />
      </div>

      {/* Tone Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-200">Response Tone</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {toneOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value)}
                className={`p-3 rounded-xl border transition-all duration-300 text-left group ${
                  tone === option.value
                    ? 'bg-blue-500/20 border-blue-400 text-white'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className={`w-4 h-4 ${tone === option.value ? 'text-blue-400' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{option.label}</span>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!prompt.trim() || isLoading}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          isLoading || !prompt.trim()
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            <span>Generating Response...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Generate AI Response</span>
          </>
        )}
      </button>
    </form>
  );
};