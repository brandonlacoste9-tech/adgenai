import React, { useState, useRef } from 'react';
import { Upload, Camera, Video, Zap, Trophy, Target, Share } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadFormData {
  caption: string;
  vibe: 'bro' | 'influencer';
  workoutType: string;
  streakDay: number;
  targetBadges: string[];
  enableMetricsOverlay: boolean;
  exportPlatforms: string[];
}

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    caption: '',
    vibe: 'influencer',
    workoutType: '',
    streakDay: 1,
    targetBadges: [],
    enableMetricsOverlay: true,
    exportPlatforms: ['tiktok', 'instagram']
  });
  const [overlayPreview, setOverlayPreview] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const workoutTypes = [
    'Strength Training', 'Cardio', 'Yoga', 'CrossFit', 'Running', 'Cycling',
    'Swimming', 'Pilates', 'HIIT', 'Flexibility', 'Recovery', 'Nutrition'
  ];

  const availableBadges = [
    'Glow Getter', 'Streak Beast', 'Crypto Queen', 'Crypto Grinder',
    'Launch Muse', 'Launch Bro', 'Creator Unlocked', 'Influencer Pulse',
    'Badge Beast', 'Referral Ritualist', 'Trend Ritualist'
  ];

  const exportPlatforms = [
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'youtube', name: 'YouTube', icon: '📹' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Mock upload process - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would:
      // 1. Upload to Supabase storage
      // 2. Process with FFmpeg WASM for overlay
      // 3. Save post data to database
      // 4. Export to selected platforms
      
      alert('Post uploaded successfully! 🚀');
      resetForm();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl('');
    setFormData({
      caption: '',
      vibe: 'influencer',
      workoutType: '',
      streakDay: 1,
      targetBadges: [],
      enableMetricsOverlay: true,
      exportPlatforms: ['tiktok', 'instagram']
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleBadge = (badge: string) => {
    setFormData(prev => ({
      ...prev,
      targetBadges: prev.targetBadges.includes(badge)
        ? prev.targetBadges.filter(b => b !== badge)
        : [...prev.targetBadges, badge]
    }));
  };

  const toggleExportPlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      exportPlatforms: prev.exportPlatforms.includes(platform)
        ? prev.exportPlatforms.filter(p => p !== platform)
        : [...prev.exportPlatforms, platform]
    }));
  };

  const renderMetricsOverlay = () => {
    if (!formData.enableMetricsOverlay) return null;

    return (
      <div className="absolute top-4 right-4 space-y-2">
        <motion.div 
          className="bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 inline mr-1 text-orange-400" />
          Day {formData.streakDay} streak
        </motion.div>
        <div className="bg-green-600/90 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          <Trophy className="w-4 h-4 inline mr-1" />
          +0.1 USDC
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Post 🐝
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* File Upload Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
            {!previewUrl ? (
              <div>
                <div className="flex justify-center space-x-4 mb-4">
                  <Camera className="w-12 h-12 text-gray-400" />
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Upload your fitness content
                </h3>
                <p className="text-gray-500 mb-4">
                  Share your workout, progress, or motivation
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  <Upload className="w-5 h-5 inline mr-2" />
                  Choose File
                </motion.button>
              </div>
            ) : (
              <div className="relative">
                {file?.type.startsWith('video/') ? (
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    className="max-w-full h-64 mx-auto rounded-xl object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-64 mx-auto rounded-xl object-cover"
                  />
                )}
                {renderMetricsOverlay()}
                
                <button
                  onClick={resetForm}
                  className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 space-y-6">
          {/* Vibe Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Choose Your Vibe
            </label>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setFormData(prev => ({ ...prev, vibe: 'influencer' }))}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.vibe === 'influencer'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="text-2xl mb-2">✨</div>
                <div className="font-semibold">Influencer Mode</div>
                <div className="text-sm text-gray-600">Glow, aesthetics, lifestyle</div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setFormData(prev => ({ ...prev, vibe: 'bro' }))}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  formData.vibe === 'bro'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">💪</div>
                <div className="font-semibold">Bro Mode</div>
                <div className="text-sm text-gray-600">Strength, grind, gains</div>
              </motion.button>
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Share your story, progress, or motivation..."
              className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Workout Type & Streak */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Workout Type
              </label>
              <select
                value={formData.workoutType}
                onChange={(e) => setFormData(prev => ({ ...prev, workoutType: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select type</option>
                {workoutTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Streak Day
              </label>
              <input
                type="number"
                min="1"
                value={formData.streakDay}
                onChange={(e) => setFormData(prev => ({ ...prev, streakDay: parseInt(e.target.value) || 1 }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Target Badges */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Target Badges (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableBadges.map(badge => (
                <motion.button
                  key={badge}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBadge(badge)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.targetBadges.includes(badge)
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Trophy className="w-4 h-4 inline mr-1" />
                  {badge}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Export Platforms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Export to Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {exportPlatforms.map(platform => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleExportPlatform(platform.id)}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                    formData.exportPlatforms.includes(platform.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="text-xl">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Metrics Overlay Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-700">Metrics Overlay</h4>
              <p className="text-sm text-gray-600">Show streak and crypto earnings on video</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ ...prev, enableMetricsOverlay: !prev.enableMetricsOverlay }))}
              className={`w-14 h-8 rounded-full transition-all ${
                formData.enableMetricsOverlay ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: formData.enableMetricsOverlay ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full shadow-md m-1"
              />
            </motion.button>
          </div>
        </div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            file && !isUploading
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Uploading & Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Share className="w-5 h-5" />
              <span>Share with the Hive 🐝</span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Upload;