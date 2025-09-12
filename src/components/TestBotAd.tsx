import React from 'react';
import { BotAdMessage } from './BotAdMessage';

export const TestBotAd: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">BotAdMessage Component Test</h1>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Dashboard Context</h2>
        <BotAdMessage 
          context="dashboard"
          messageCount={5}
          limit={10}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Chat Context - Near Limit</h2>
        <BotAdMessage 
          context="chat"
          messageCount={8}
          limit={10}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Chat Context - At Limit</h2>
        <BotAdMessage 
          context="chat"
          messageCount={10}
          limit={10}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Sidebar Context</h2>
        <BotAdMessage 
          context="sidebar"
          messageCount={7}
          limit={10}
        />
      </div>
    </div>
  );
};