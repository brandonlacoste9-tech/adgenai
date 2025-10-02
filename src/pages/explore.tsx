import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Users, Zap, Trophy, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrendingItem {
  id: string;
  type: 'routine' | 'creator' | 'badge' | 'sound';
  title: string;
  description: string;
  thumbnail?: string;
  avatar?: string;
  stats: {
    uses?: number;
    followers?: number;
    unlocks?: number;
    posts?: number;
  };
  tags: string[];
  trending_score: number;
}

interface ExploreCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('trending');
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: ExploreCategory[] = [
    {
      id: 'trending',
      name: 'Trending',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Hot content right now',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'routines',
      name: 'Routines',
      icon: <Zap className="w-5 h-5" />,
      description: 'Workout routines',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'creators',
      name: 'Creators',
      icon: <Users className="w-5 h-5" />,
      description: 'Top fitness creators',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'badges',
      name: 'Badges',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Achievement badges',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    loadTrendingContent();
  }, [activeCategory]);

  const loadTrendingContent = async () => {
    setLoading(true);
    
    // Mock data - replace with actual API call
    const mockData: TrendingItem[] = [
      {
        id: '1',
        type: 'routine',
        title: '7-Minute Morning Glow',
        description: 'Quick morning routine for energy boost',
        thumbnail: '/routines/morning-glow.jpg',
        stats: { uses: 12543 },
        tags: ['morning', 'energy', 'quick'],
        trending_score: 95
      },
      {
        id: '2',
        type: 'creator',
        title: 'FitBeast Alex',
        description: 'Strength training specialist',
        avatar: '/avatars/alex.jpg',
        stats: { followers: 45234, posts: 156 },
        tags: ['strength', 'powerlifting', 'motivation'],
        trending_score: 88
      },
      {
        id: '3',
        type: 'badge',
        title: 'Crypto Queen',
        description: 'Earned 1 USDC from fitness activities',
        thumbnail: '/badges/crypto-queen.png',
        stats: { unlocks: 2341 },
        tags: ['crypto', 'earnings', 'achievement'],
        trending_score: 82
      },
      {
        id: '4',
        type: 'sound',
        title: 'Workout Beast Mode',
        description: 'High-energy workout anthem',
        thumbnail: '/sounds/beast-mode.jpg',
        stats: { uses: 8765 },
        tags: ['music', 'motivation', 'energy'],
        trending_score: 79
      },
      {
        id: '5',
        type: 'routine',
        title: 'HIIT Crypto Burner',
        description: 'Burn calories, earn crypto',
        thumbnail: '/routines/hiit-crypto.jpg',
        stats: { uses: 6543 },
        tags: ['hiit', 'cardio', 'crypto'],
        trending_score: 76
      }
    ];

    setTimeout(() => {
      setTrendingItems(mockData);
      setLoading(false);
    }, 500);
  };

  const filteredItems = trendingItems.filter(item => {
    if (activeCategory !== 'trending' && item.type !== activeCategory.slice(0, -1)) {
      return false;
    }
    
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return true;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'routine': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'creator': return <Users className="w-5 h-5 text-green-500" />;
      case 'badge': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'sound': return <span className="text-pink-500">🎵</span>;
      default: return <Star className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderTrendingItem = (item: TrendingItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="relative">
        {item.thumbnail && (
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-32 object-cover"
          />
        )}
        {item.avatar && (
          <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <img 
              src={item.avatar} 
              alt={item.title}
              className="w-16 h-16 rounded-full border-4 border-white"
            />
          </div>
        )}
        
        <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
          {getItemIcon(item.type)}
          <span className="ml-1 capitalize">{item.type}</span>
        </div>
        
        <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          #{item.trending_score}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            {item.stats.uses && `${item.stats.uses.toLocaleString()} uses`}
            {item.stats.followers && `${item.stats.followers.toLocaleString()} followers`}
            {item.stats.unlocks && `${item.stats.unlocks.toLocaleString()} unlocks`}
            {item.stats.posts && `${item.stats.posts} posts`}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
          >
            {item.type === 'creator' ? 'Follow' : item.type === 'routine' ? 'Try It' : 'View'}
          </motion.button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderFeaturedSection = () => (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Featured This Week</h2>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">🏆 Badge Challenge</h3>
            <p className="text-purple-100 mb-4">
              Unlock the "Trend Ritualist" badge by using 3 trending sounds this week!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Join Challenge
            </motion.button>
          </div>
          <div className="ml-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              🎵
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Explore 🔍
          </h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search routines, creators, badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Featured Section */}
        {activeCategory === 'trending' && renderFeaturedSection()}

        {/* Quick Stats */}
        {activeCategory === 'trending' && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-purple-600">156K</div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-blue-600">2.3M</div>
              <div className="text-sm text-gray-600">Workouts Shared</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-green-600">$125K</div>
              <div className="text-sm text-gray-600">USDC Earned</div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => renderTrendingItem(item, index))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : 'No content available in this category yet.'
                  }
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {filteredItems.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 bg-white rounded-2xl shadow-lg font-semibold text-gray-700 hover:shadow-xl transition-all"
            onClick={() => loadTrendingContent()}
          >
            Load More {activeCategory === 'trending' ? 'Trending' : categories.find(c => c.id === activeCategory)?.name}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Explore;