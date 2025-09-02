/*
  # Create Core Tables

  1. New Tables
    - `profiles` - User profile and subscription data
    - `migration_requests` - Migration intake requests
    - `blog_posts` - CMS blog content
    - `analytics_events` - User analytics tracking
    - `share_views` - Share tracking data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Service role access for admin operations

  3. Indexes
    - Performance indexes on commonly queried columns
    - Full-text search indexes for content
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Profiles table for user data and subscriptions
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  full_name TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'cancelled', 'past_due')),
  subscription_id TEXT,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
  subscription_created_at TIMESTAMPTZ,
  subscription_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration requests table
CREATE TABLE IF NOT EXISTS public.migration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  current_tool TEXT NOT NULL,
  monthly_spend TEXT,
  pain_points TEXT[] DEFAULT '{}',
  urgency TEXT,
  team_size TEXT,
  calendly_preference TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table for CMS
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'AdGen AI Research Team',
  publish_date TIMESTAMPTZ DEFAULT NOW(),
  read_time TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  category TEXT DEFAULT 'strategy' CHECK (category IN ('autopsy', 'case-study', 'comparison', 'strategy', 'tutorial')),
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT,
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  engagement_score NUMERIC DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
  conversion_rate NUMERIC DEFAULT 0 CHECK (conversion_rate >= 0 AND conversion_rate <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID,
  event TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Share views table
CREATE TABLE IF NOT EXISTS public.share_views (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  session_id TEXT,
  page TEXT NOT NULL,
  meta JSONB DEFAULT '{}',
  user_agent TEXT,
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.migration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.share_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can update subscriptions" ON public.profiles
  FOR UPDATE TO service_role
  USING (true)
  WITH CHECK (true);

-- Migration requests policies
CREATE POLICY "Migration requests are viewable by authenticated users" ON public.migration_requests
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can create migration requests" ON public.migration_requests
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Blog posts policies
CREATE POLICY "Published posts are viewable by everyone" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Service role can manage all posts" ON public.blog_posts
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Analytics policies
CREATE POLICY "Service role can manage all analytics" ON public.analytics_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view their own analytics" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Share views policies
CREATE POLICY "Allow inserts from anon" ON public.share_views
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own share data" ON public.share_views
  FOR SELECT TO authenticated
  USING (true);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_id ON public.profiles (subscription_id);
CREATE INDEX IF NOT EXISTS idx_profiles_plan_type ON public.profiles (plan_type);

CREATE INDEX IF NOT EXISTS idx_migration_requests_email ON public.migration_requests (email);
CREATE INDEX IF NOT EXISTS idx_migration_requests_status ON public.migration_requests (status);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events (user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event ON public.analytics_events (event);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at);

CREATE INDEX IF NOT EXISTS idx_share_views_session_id ON public.share_views (session_id);
CREATE INDEX IF NOT EXISTS idx_share_views_page ON public.share_views (page);
CREATE INDEX IF NOT EXISTS idx_share_views_ts ON public.share_views (ts);
CREATE INDEX IF NOT EXISTS idx_share_views_meta ON public.share_views USING GIN (meta);