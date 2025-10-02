import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Trophy, Eye, Heart, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalFollowers: number;
  totalEarnings: number;
  postsThisMonth: number;
  engagementRate: number;
  badgeUnlocks: number;
}

interface PostPerformance {
  id: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  earnings: number;
  publishedAt: Date;
  thumbnail: string;
}

interface BadgeMetrics {
  name: string;
  unlocks: number;
  earnings: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [posts, setPosts] = useState<PostPerformance[]>([]);
  const [badges, setBadges] = useState<BadgeMetrics[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    
    // Mock data - replace with actual API calls
    const mockStats: DashboardStats = {
      totalViews: 156789,
      totalLikes: 23456,
      totalShares: 3456,
      totalFollowers: 12543,
      totalEarnings: 234.67,
      postsThisMonth: 18,
      engagementRate: 8.4,
      badgeUnlocks: 127
    };

    const mockPosts: PostPerformance[] = [
      {
        id: '1',
        title: '7-Day Streak Complete! 💪',
        views: 15234,
        likes: 1876,
        shares: 234,
        comments: 156,
        earnings: 12.45,
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        thumbnail: '/posts/streak-complete.jpg'
      },
      {
        id: '2',
        title: 'Morning Glow Routine ✨',
        views: 8934,
        likes: 1234,
        shares: 89,
        comments: 67,
        earnings: 8.90,
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        thumbnail: '/posts/morning-glow.jpg'
      },
      {
        id: '3',
        title: 'HIIT Crypto Burner 🔥',
        views: 12456,
        likes: 1567,
        shares: 178,
        comments: 234,
        earnings: 15.67,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        thumbnail: '/posts/hiit-crypto.jpg'
      }
    ];

    const mockBadges: BadgeMetrics[] = [
      { name: 'Glow Getter', unlocks: 45, earnings: 67.80, color: '#8B5CF6' },
      { name: 'Crypto Queen', unlocks: 23, earnings: 89.45, color: '#10B981' },
      { name: 'Streak Beast', unlocks: 67, earnings: 45.23, color: '#F59E0B' },
      { name: 'Badge Beast', unlocks: 34, earnings: 32.19, color: '#EF4444' }
    ];

    setTimeout(() => {
      setStats(mockStats);
      setPosts(mockPosts);
      setBadges(mockBadges);
      setLoading(false);
    }, 500);
  };

  // Chart data
  const viewsData = [
    { date: '1/1', views: 1200, earnings: 8.50 },
    { date: '1/2', views: 1800, earnings: 12.30 },
    { date: '1/3', views: 1400, earnings: 9.80 },
    { date: '1/4', views: 2200, earnings: 15.40 },
    { date: '1/5', views: 1900, earnings: 13.20 },
    { date: '1/6', views: 2600, earnings: 18.90 },
    { date: '1/7', views: 2100, earnings: 14.70 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8" />
        <div className="text-right">
          <div className="text-sm opacity-75">vs last period</div>
          <div className={`text-sm font-bold ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{title}</div>
    </motion.div>
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

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Creator Dashboard 📊
              </h1>
              <p className="text-gray-600 mt-2">Track your performance and earnings</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { value: '7d', label: '7 Days' },
                  { value: '30d', label: '30 Days' },
                  { value: '90d', label: '90 Days' }
                ].map(({ value, label }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTimeRange(value as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeRange === value
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            change={12.3}
            icon={Eye}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Followers"
            value={stats.totalFollowers.toLocaleString()}
            change={8.7}
            icon={Users}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Total Earnings"
            value={`$${stats.totalEarnings.toFixed(2)}`}
            change={15.2}
            icon={DollarSign}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Badge Unlocks"
            value={stats.badgeUnlocks.toString()}
            change={23.1}
            icon={Trophy}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Views & Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Views & Earnings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Badge Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Badge Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={badges}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="unlocks"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {badges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Top Performing Posts</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-gray-600">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-600">{post.shares}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        ${post.earnings.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.publishedAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Badge Revenue Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map(badge => (
            <motion.div
              key={badge.name}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              style={{ borderTop: `4px solid ${badge.color}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-6 h-6" style={{ color: badge.color }} />
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{badge.unlocks}</div>
                  <div className="text-sm text-gray-600">unlocks</div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
              <div className="text-lg font-bold text-green-600">
                ${badge.earnings.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">total earned</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;