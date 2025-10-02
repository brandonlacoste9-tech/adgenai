import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Flame, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  mediaUrl: string;
  mediaType: 'video' | 'image';
  caption: string;
  badges: string[];
  streakCount: number;
  cryptoEarned: number;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  vibe: 'bro' | 'influencer';
}

interface BadgeReaction {
  type: 'like' | 'heart' | 'muscle' | 'fire' | 'badge';
  icon: React.ReactNode;
  label: string;
}

const badgeReactions: BadgeReaction[] = [
  { type: 'like', icon: <Heart className="w-6 h-6" />, label: 'Like' },
  { type: 'heart', icon: <Heart className="w-6 h-6 fill-red-500" />, label: 'Love' },
  { type: 'muscle', icon: <span className="text-2xl">💪</span>, label: 'Strong' },
  { type: 'fire', icon: <Flame className="w-6 h-6 text-orange-500" />, label: 'Fire' },
  { type: 'badge', icon: <Trophy className="w-6 h-6 text-yellow-500" />, label: 'Badge' }
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    // Mock data - replace with actual API call
    const mockPosts: Post[] = [
      {
        id: '1',
        creatorId: 'user1',
        creatorName: 'FitQueen Sara',
        creatorAvatar: '/avatars/sara.jpg',
        mediaUrl: '/videos/workout1.mp4',
        mediaType: 'video',
        caption: '7-day streak complete! 💪 Just earned 0.3 USDC from my Glow Getter badge unlock 🔥',
        badges: ['Glow Getter', 'Streak Beast'],
        streakCount: 7,
        cryptoEarned: 0.3,
        likes: 142,
        comments: 23,
        shares: 8,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        vibe: 'influencer'
      },
      {
        id: '2',
        creatorId: 'user2',
        creatorName: 'GrindBro Mike',
        creatorAvatar: '/avatars/mike.jpg',
        mediaUrl: '/images/deadlift.jpg',
        mediaType: 'image',
        caption: 'New PR! 405lbs deadlift 🚀 Badge Beast status activated',
        badges: ['Badge Beast', 'Crypto Grinder'],
        streakCount: 14,
        cryptoEarned: 0.75,
        likes: 89,
        comments: 12,
        shares: 5,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        vibe: 'bro'
      }
    ];

    setPosts(mockPosts);
    setLoading(false);
  };

  const handleReaction = (postId: string, reactionType: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
    setSelectedReaction(null);
  };

  const renderBadges = (badges: string[], vibe: 'bro' | 'influencer') => {
    const badgeStyle = vibe === 'bro' 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white';

    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {badges.map((badge, index) => (
          <motion.span
            key={badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeStyle} shadow-lg`}
          >
            <Trophy className="w-4 h-4 inline mr-1" />
            {badge}
          </motion.span>
        ))}
      </div>
    );
  };

  const renderMetricsOverlay = (post: Post) => (
    <div className="absolute top-4 right-4 space-y-2">
      <motion.div 
        className="bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className="w-4 h-4 inline mr-1 text-orange-400" />
        {post.streakCount} day streak
      </motion.div>
      <div className="bg-green-600/90 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        <Zap className="w-4 h-4 inline mr-1" />
        ${post.cryptoEarned} USDC
      </div>
    </div>
  );

  const renderPost = (post: Post) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 border border-gray-100"
    >
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <img 
          src={post.creatorAvatar} 
          alt={post.creatorName}
          className="w-12 h-12 rounded-full border-2 border-gradient"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{post.creatorName}</h3>
          <p className="text-sm text-gray-500">
            {post.timestamp.toLocaleDateString()} • {post.vibe === 'bro' ? '💪 Bro Mode' : '✨ Influencer Mode'}
          </p>
        </div>
        <div className="text-sm font-semibold text-blue-600">
          Following
        </div>
      </div>

      {/* Media with overlay */}
      <div className="relative">
        {post.mediaType === 'video' ? (
          <video 
            src={post.mediaUrl}
            className="w-full h-80 object-cover"
            controls
            playsInline
          />
        ) : (
          <img 
            src={post.mediaUrl}
            alt="Post content"
            className="w-full h-80 object-cover"
          />
        )}
        {renderMetricsOverlay(post)}
      </div>

      {/* Content */}
      <div className="p-4">
        {renderBadges(post.badges, post.vibe)}
        
        <p className="text-gray-800 mb-4 leading-relaxed">
          {post.caption}
        </p>

        {/* Engagement Stats */}
        <div className="flex items-center space-x-6 mb-4 text-gray-600">
          <span className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Share className="w-4 h-4" />
            <span>{post.shares}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            {badgeReactions.map((reaction) => (
              <motion.button
                key={reaction.type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleReaction(post.id, reaction.type)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {reaction.icon}
                <span className="text-sm font-medium">{reaction.label}</span>
              </motion.button>
            ))}
          </div>
          
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
            Comment
          </button>
        </div>
      </div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tristan 🐝 Feed
          </h1>
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <AnimatePresence>
          {posts.map(renderPost)}
        </AnimatePresence>
        
        {/* Load More */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-white rounded-2xl shadow-lg font-semibold text-gray-700 hover:shadow-xl transition-all"
          onClick={() => loadFeed()}
        >
          Load More Posts
        </motion.button>
      </div>
    </div>
  );
};

export default Feed;