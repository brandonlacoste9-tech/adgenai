import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Zap, Trophy, Heart, Smile, Image, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  vibe: 'bro' | 'influencer' | 'mixed';
  avatar: string;
  lastMessage?: ChatMessage;
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'badge_share' | 'streak_celebration';
  timestamp: Date;
  reactions: MessageReaction[];
  badgeData?: {
    name: string;
    icon: string;
    rarity: string;
  };
  streakData?: {
    days: number;
    workoutType: string;
  };
}

interface MessageReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

const Chat: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('crypto-queens');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: 'crypto-queens',
      name: 'Crypto Queens 💰',
      description: 'Earning USDC while getting fit',
      memberCount: 1247,
      vibe: 'influencer',
      avatar: '/groups/crypto-queens.jpg'
    },
    {
      id: 'grind-bros',
      name: 'Grind Bros 💪',
      description: 'Strength & Brotherhood',
      memberCount: 892,
      vibe: 'bro',
      avatar: '/groups/grind-bros.jpg'
    },
    {
      id: 'glow-ritualists',
      name: 'Glow Ritualists ✨',
      description: 'Morning routines & mindful movement',
      memberCount: 2156,
      vibe: 'mixed',
      avatar: '/groups/glow-ritualists.jpg'
    },
    {
      id: 'badge-hunters',
      name: 'Badge Hunters 🏆',
      description: 'Achievement unlocking community',
      memberCount: 634,
      vibe: 'mixed',
      avatar: '/groups/badge-hunters.jpg'
    }
  ];

  useEffect(() => {
    loadMessages();
    scrollToBottom();
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    // Mock data - replace with actual API call
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'FitQueen Sara',
        avatar: '/avatars/sara.jpg',
        content: 'Just unlocked the Crypto Queen badge! 💰✨',
        type: 'badge_share',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        reactions: [
          { emoji: '🔥', count: 12, userReacted: false },
          { emoji: '💪', count: 8, userReacted: true }
        ],
        badgeData: {
          name: 'Crypto Queen',
          icon: '💰',
          rarity: 'rare'
        }
      },
      {
        id: '2',
        userId: 'user2',
        username: 'GlowGoddess Maya',
        avatar: '/avatars/maya.jpg',
        content: '7-day streak complete! Who else is on fire this week? 🔥',
        type: 'streak_celebration',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        reactions: [
          { emoji: '🎉', count: 15, userReacted: true },
          { emoji: '✨', count: 7, userReacted: false }
        ],
        streakData: {
          days: 7,
          workoutType: 'Yoga Flow'
        }
      },
      {
        id: '3',
        userId: 'user3',
        username: 'CryptoFitness Mike',
        avatar: '/avatars/mike.jpg',
        content: 'Morning workout done! Love the energy in this group 💪',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        reactions: [
          { emoji: '💪', count: 5, userReacted: false }
        ]
      }
    ];

    setMessages(mockMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current_user',
      username: 'You',
      avatar: '/avatars/current.jpg',
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
      reactions: []
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map(r =>
                r.emoji === emoji
                  ? { ...r, count: r.userReacted ? r.count - 1 : r.count + 1, userReacted: !r.userReacted }
                  : r
              )
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1, userReacted: true }]
            };
          }
        }
        return msg;
      })
    );
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.userId === 'current_user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-xs md:max-w-md`}>
          {!isCurrentUser && (
            <img
              src={message.avatar}
              alt={message.username}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
          )}
          
          <div className={`${isCurrentUser ? 'mr-3' : 'ml-3'}`}>
            {!isCurrentUser && (
              <div className="text-xs text-gray-600 mb-1">{message.username}</div>
            )}
            
            <div className={`rounded-2xl px-4 py-2 ${
              isCurrentUser
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}>
              {message.type === 'badge_share' && message.badgeData && (
                <div className="mb-2 p-3 bg-black/10 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{message.badgeData.icon}</span>
                    <div>
                      <div className="font-bold">{message.badgeData.name}</div>
                      <div className="text-xs opacity-75 capitalize">{message.badgeData.rarity} Badge</div>
                    </div>
                  </div>
                </div>
              )}
              
              {message.type === 'streak_celebration' && message.streakData && (
                <div className="mb-2 p-3 bg-black/10 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="font-bold">{message.streakData.days} Day Streak!</div>
                      <div className="text-xs opacity-75">{message.streakData.workoutType}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div>{message.content}</div>
            </div>
            
            {message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map(reaction => (
                  <motion.button
                    key={reaction.emoji}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addReaction(message.id, reaction.emoji)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      reaction.userReacted
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </motion.button>
                ))}
              </div>
            )}
            
            <div className={`text-xs mt-1 ${isCurrentUser ? 'text-right' : 'text-left'} text-gray-500`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Hive Chat 🐝
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatRooms.map(room => (
            <motion.button
              key={room.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRoom(room.id)}
              className={`w-full p-4 flex items-center space-x-3 border-b border-gray-100 transition-all ${
                selectedRoom === room.id
                  ? 'bg-purple-50 border-r-4 border-r-purple-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <img
                src={room.avatar}
                alt={room.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">{room.name}</div>
                <div className="text-sm text-gray-600 truncate">{room.description}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{room.memberCount} members</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {selectedRoomData && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <img
                src={selectedRoomData.avatar}
                alt={selectedRoomData.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h2 className="font-bold text-gray-900">{selectedRoomData.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedRoomData.memberCount} members</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>124 online</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map(renderMessage)}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-gray-500"
            >
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
              <span className="text-sm">Someone is typing...</span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reactions */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-2">
            {['🔥', '💪', '✨', '🎉', '💰', '🏆'].map(emoji => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-lg"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              >
                <Image className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              >
                <Video className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              >
                <Smile className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Share your progress, ask questions..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                  newMessage.trim()
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;