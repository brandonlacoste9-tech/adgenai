import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotAdMessage } from './BotAdMessage';
import { useMessageTracking } from '../hooks/useMessageTracking';
import { Send, Bot, User, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const { incrementMessageCount, canSendMessage, shouldShowAdForContext, tracking } = useMessageTracking();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI ad assistant. How can I help you create amazing ads today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Check if user can send message
    if (!canSendMessage()) {
      setShowLimitModal(true);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Increment message count
    incrementMessageCount();
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message! Here's how I can help you create an effective ad campaign based on "${inputValue}". Would you like me to generate some ad copy suggestions?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-96 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">AI Ad Assistant</h3>
              <p className="text-sm opacity-90">
                Messages: {tracking.count}/{tracking.limit === -1 ? '∞' : tracking.limit}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1 text-primary-600" />}
                  {message.sender === 'user' && <User className="w-4 h-4 mt-1" />}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Upgrade Prompt */}
        {shouldShowAdForContext('chat') && (
          <div className="px-4 pb-2">
            <BotAdMessage 
              context="chat"
              messageCount={tracking.count}
              limit={tracking.limit}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={canSendMessage() ? "Type your message..." : "Upgrade to continue chatting..."}
              disabled={!canSendMessage()}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!canSendMessage() || !inputValue.trim()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {!canSendMessage() && (
            <div className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              You've reached your daily message limit. Upgrade to Pro for unlimited messages.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Free Tier Exhausted */}
      <AnimatePresence>
        {showLimitModal && (
          <BotAdMessage 
            context="modal"
            messageCount={tracking.count}
            limit={tracking.limit}
            onDismiss={() => setShowLimitModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};