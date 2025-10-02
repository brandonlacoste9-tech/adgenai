import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Calendar, TrendingUp, Users, Settings, Share2, Badge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  vibe: 'bro' | 'influencer';
  stats: {
    followers: number;
    following: number;
    posts: number;
    totalCryptoEarned: number;
    longestStreak: number;
    currentStreak: number;
  };
  badges: UserBadge[];
  streakCalendar: StreakDay[];
  achievements: Achievement[];
}

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
  unlockedAt: Date;
  progress?: {
    current: number;
    target: number;
  };
}

interface StreakDay {
  date: Date;
  completed: boolean;
  workoutType?: string;
  cryptoEarned?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  shareCount: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'calendar' | 'achievements'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Mock data - replace with actual API call
    const mockProfile: UserProfile = {
      id: 'user1',
      username: 'fitqueen_sara',
      displayName: 'Sara | Glow Ritualist ✨',
      avatar: '/avatars/sara.jpg',
      bio: '🏋️‍♀️ 7-day streak beast | 💰 Crypto fitness queen | ✨ Building the glow empire',
      vibe: 'influencer',
      stats: {
        followers: 12543,
        following: 892,
        posts: 156,
        totalCryptoEarned: 45.67,
        longestStreak: 28,
        currentStreak: 7
      },
      badges: [
        {
          id: '1',
          name: 'Glow Getter',
          description: 'Completed 7-day streak',
          icon: '✨',
          rarity: 'common',
          unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          name: 'Crypto Queen',
          description: 'Earned 0.5 USDC from badges',
          icon: '💰',
          rarity: 'rare',
          unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          name: 'Influencer Pulse',
          description: 'Reached 1K views milestone',
          icon: '📈',
          rarity: 'legendary',
          unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        }
      ],
      streakCalendar: generateMockCalendar(),
      achievements: [
        {
          id: '1',
          title: 'First Week Champion',
          description: 'Completed your first 7-day streak',
          icon: '🏆',
          unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          shareCount: 23
        }
      ]
    };

    setProfile(mockProfile);
    setLoading(false);
  };

  function generateMockCalendar(): StreakDay[] {
    const days: StreakDay[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      days.push({
        date,
        completed: Math.random() > 0.3, // 70% completion rate
        workoutType: ['Strength', 'Cardio', 'Yoga', 'HIIT'][Math.floor(Math.random() * 4)],
        cryptoEarned: Math.random() * 0.1
      });
    }
    
    return days;
  }

  const getBadgeStyle = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-xl';
      case 'rare':
        return 'bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 shadow-lg';
      default:
        return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 shadow-md';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-4 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6" />
            <span className="text-sm font-medium">Current Streak</span>
          </div>
          <div className="text-2xl font-bold">{profile?.stats.currentStreak} days</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-6 h-6" />
            <span className="text-sm font-medium">USDC Earned</span>
          </div>
          <div className="text-2xl font-bold">${profile?.stats.totalCryptoEarned}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6" />
            <span className="text-sm font-medium">Followers</span>
          </div>
          <div className="text-2xl font-bold">{profile?.stats.followers.toLocaleString()}</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-medium">Best Streak</span>
          </div>
          <div className="text-2xl font-bold">{profile?.stats.longestStreak} days</div>
        </motion.div>
      </div>

      {/* Recent Badges */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Badges</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {profile?.badges.slice(0, 3).map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -5 }}
              className={`flex-shrink-0 w-24 h-32 ${getBadgeStyle(badge.rarity)} rounded-2xl p-4 text-white flex flex-col items-center justify-center text-center`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="text-sm font-bold">{badge.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {profile?.badges.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className={`${getBadgeStyle(badge.rarity)} rounded-2xl p-6 text-white`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
              <p className="text-sm opacity-90 mb-3">{badge.description}</p>
              <div className="text-xs opacity-75">
                Unlocked {badge.unlockedAt.toLocaleDateString()}
              </div>
              {badge.progress && (
                <div className="mt-3">
                  <div className="bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(badge.progress.current / badge.progress.target) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1">
                    {badge.progress.current}/{badge.progress.target}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Progress Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Towards Next Badge</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                🔥
              </div>
              <div>
                <h4 className="font-semibold">Trend Ritualist</h4>
                <p className="text-sm text-gray-600">Use 5 trending sounds</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">3/5</div>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div className="w-3/5 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-6">30-Day Streak Calendar</h3>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {profile?.streakCalendar.map((day, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer ${
              day.completed
                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {day.date.getDate()}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span>Missed</span>
          </div>
        </div>
        <div className="text-gray-600">
          {profile?.streakCalendar.filter(day => day.completed).length}/30 days
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

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={profile.avatar}
              alt={profile.displayName}
              className="w-20 h-20 rounded-full border-4 border-gradient shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{profile.displayName}</h1>
              <p className="text-gray-600">@{profile.username}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.bio}</p>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="font-bold text-xl text-gray-900">{profile.stats.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl text-gray-900">{profile.stats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl text-gray-900">{profile.stats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'badges', label: 'Badges', icon: Trophy },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'achievements', label: 'Achievements', icon: Badge }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-all ${
                  activeTab === id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'badges' && renderBadges()}
            {activeTab === 'calendar' && renderCalendar()}
            {activeTab === 'achievements' && renderOverview()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;