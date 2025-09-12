import React from 'react';
import { motion } from 'framer-motion';
import { BotAdMessage } from './BotAdMessage';
import { useMessageTracking } from '../hooks/useMessageTracking';
import { useSubscription } from '../hooks/useSubscription';
import { BarChart3, Target, Shield, Zap } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { shouldShowAdForContext, tracking } = useMessageTracking();
  const { isPaid } = useSubscription();

  const sidebarItems = [
    { icon: BarChart3, label: 'Analytics', href: '/dashboard' },
    { icon: Target, label: 'Campaigns', href: '/dashboard' },
    { icon: Shield, label: 'Fraud Detection', href: '/dashboard', pro: true },
    { icon: Zap, label: 'AI Generator', href: '/dashboard' },
  ];

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 z-40 pt-4 hidden lg:block"
    >
      <div className="flex flex-col h-full px-4">
        {/* Navigation Items */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 ${
                      item.pro && !isPaid ? 'opacity-50' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    {item.pro && !isPaid && (
                      <span className="ml-auto text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                        PRO
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bot Ad Message in Sidebar */}
        {shouldShowAdForContext('sidebar') && (
          <div className="mt-auto mb-4">
            <BotAdMessage 
              context="sidebar"
              messageCount={tracking.count}
              limit={tracking.limit}
            />
          </div>
        )}
      </div>
    </motion.aside>
  );
};