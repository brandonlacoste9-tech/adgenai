import React, { useState } from 'react';
import { 
  PenTool, 
  Megaphone, 
  BarChart3, 
  HeadphonesIcon, 
  Target, 
  Search,
  Sparkles,
  Brain
} from 'lucide-react';
import { PromptForm } from './PromptForm';
import { ResponseStream } from './ResponseStream';
import { aiService } from '../lib/aiService';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const tabs: Tab[] = [
  {
    id: 'content-creation',
    label: 'Content Creation',
    icon: PenTool,
    description: 'Generate engaging content, blogs, social media posts, and marketing copy',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'advertising',
    label: 'Advertising',
    icon: Megaphone,
    description: 'Create compelling ad campaigns, copy, and targeting strategies',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    icon: BarChart3,
    description: 'Analyze metrics, generate reports, and extract business insights',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'customer-service',
    label: 'Customer Service',
    icon: HeadphonesIcon,
    description: 'Develop support strategies, response templates, and service protocols',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'strategy',
    label: 'Strategy',
    icon: Target,
    description: 'Business planning, competitive analysis, and strategic recommendations',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'market-research',
    label: 'Market Research',
    icon: Search,
    description: 'Market analysis, customer insights, and competitive intelligence',
    color: 'from-teal-500 to-blue-500'
  }
];

export const BusinessAssistantTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content-creation');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handlePromptSubmit = async (prompt: string, context: string, tone: string) => {
    setIsLoading(true);
    setIsStreaming(true);
    setResponse('');

    try {
      let fullResponse = '';
      
      for await (const chunk of aiService.generateResponse(prompt, context, tone, activeTab)) {
        const content = chunk.choices?.[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          setResponse(fullResponse);
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('Sorry, there was an error generating the response. Please try again.');
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Brain className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">NeuroSphere Business Assistant</h2>
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group p-4 rounded-xl border transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-white/10 border-white/30 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tab.color} opacity-0 ${
                  isActive ? 'opacity-20' : 'group-hover:opacity-10'
                } transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <Icon className={`w-6 h-6 mb-3 ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  } transition-colors duration-300`} />
                  <h3 className={`font-semibold mb-2 text-sm ${
                    isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  } transition-colors duration-300`}>
                    {tab.label}
                  </h3>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        {/* Tab Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${activeTabData.color}`}>
              <activeTabData.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{activeTabData.label}</h3>
              <p className="text-gray-300">{activeTabData.description}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div>
            <PromptForm
              onSubmit={handlePromptSubmit}
              isLoading={isLoading}
              businessFunction={activeTab}
            />
          </div>

          {/* Right Column - Response */}
          <div>
            <ResponseStream
              content={response}
              isStreaming={isStreaming}
              onComplete={() => console.log('Response complete')}
            />
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">💡 Tips for better results:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p>• Be specific about your goals and target audience</p>
              <p>• Include relevant context about your industry or business</p>
              <p>• Specify any constraints or requirements</p>
            </div>
            <div className="space-y-2">
              <p>• Choose the appropriate tone for your use case</p>
              <p>• Provide examples of what you like or want to avoid</p>
              <p>• Ask follow-up questions to refine the output</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};