/*
  # Add Advanced Tables

  1. New Tables
    - `creative_scores` - ML performance and fraud scores
    - `ab_tests` - A/B testing campaigns
    - `competitor_analysis` - Competitive intelligence
    - `agency_partners` - Agency partnership data
    - `agency_clients` - Agency client management
    - `touchpoints` - Attribution tracking
    - `comparison_views` - Competitor comparison analytics

  2. Security
    - Enable RLS on all tables
    - User-specific access policies
    - Service role admin access

  3. Performance
    - Indexes on frequently queried columns
    - Constraints for data integrity
*/

-- Creative scores table for ML predictions
CREATE TABLE IF NOT EXISTS public.creative_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  creative_id UUID NOT NULL,
  performance_score NUMERIC NOT NULL CHECK (performance_score >= 0 AND performance_score <= 100),
  fraud_score NUMERIC NOT NULL CHECK (fraud_score >= 0 AND fraud_score <= 100),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'google', 'instagram', 'tiktok', 'linkedin')),
  predicted_ctr NUMERIC,
  predicted_cpa NUMERIC,
  confidence_level NUMERIC CHECK (confidence_level >= 0 AND confidence_level <= 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- A/B tests table
CREATE TABLE IF NOT EXISTS public.ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  campaign_name TEXT NOT NULL,
  variant_a_id UUID NOT NULL,
  variant_b_id UUID NOT NULL,
  winning_variant_id UUID,
  significance_level NUMERIC DEFAULT 0.95 CHECK (significance_level >= 0 AND significance_level <= 1),
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'paused', 'cancelled')),
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competitor analysis table
CREATE TABLE IF NOT EXISTS public.competitor_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  competitor_name TEXT NOT NULL,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('pricing', 'features', 'creative', 'performance')),
  data_points JSONB DEFAULT '{}',
  insights TEXT[],
  action_items TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agency partners table
CREATE TABLE IF NOT EXISTS public.agency_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  tier TEXT DEFAULT 'starter' CHECK (tier IN ('starter', 'pro', 'enterprise')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'cancelled')),
  client_count INTEGER DEFAULT 0,
  monthly_revenue NUMERIC DEFAULT 0,
  commission_rate NUMERIC DEFAULT 15 CHECK (commission_rate >= 0 AND commission_rate <= 50),
  white_label BOOLEAN DEFAULT false,
  custom_branding JSONB DEFAULT '{}',
  account_manager TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agency clients table
CREATE TABLE IF NOT EXISTS public.agency_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  industry TEXT NOT NULL,
  monthly_budget NUMERIC DEFAULT 0 CHECK (monthly_budget >= 0),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'churned')),
  campaigns TEXT[] DEFAULT '{}',
  performance_metrics JSONB DEFAULT '{}',
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Touchpoints table for attribution
CREATE TABLE IF NOT EXISTS public.touchpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_id TEXT NOT NULL,
  creative_id UUID NOT NULL,
  campaign_id UUID NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram', 'google', 'tiktok', 'linkedin', 'email', 'organic', 'direct')),
  touchpoint_type TEXT NOT NULL CHECK (touchpoint_type IN ('impression', 'click', 'view', 'engagement', 'conversion')),
  timestamp TIMESTAMPTZ NOT NULL,
  value NUMERIC DEFAULT 0,
  conversion_type TEXT CHECK (conversion_type IN ('signup', 'migration', 'demo', 'purchase')),
  device_type TEXT DEFAULT 'desktop' CHECK (device_type IN ('mobile', 'desktop', 'tablet')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comparison views table
CREATE TABLE IF NOT EXISTS public.comparison_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID,
  competitor_name TEXT NOT NULL,
  view_duration INTEGER DEFAULT 0,
  scroll_depth INTEGER DEFAULT 0 CHECK (scroll_depth >= 0 AND scroll_depth <= 100),
  cta_clicked BOOLEAN DEFAULT false,
  conversion_type TEXT CHECK (conversion_type IN ('signup', 'migration', 'demo', 'purchase')),
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.creative_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.touchpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparison_views ENABLE ROW LEVEL SECURITY;

-- Creative scores policies
CREATE POLICY "Users can view their own creative scores" ON public.creative_scores
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own creative scores" ON public.creative_scores
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- A/B tests policies
CREATE POLICY "Users can view their own A/B tests" ON public.ab_tests
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own A/B tests" ON public.ab_tests
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Competitor analysis policies
CREATE POLICY "Users can view their own competitor analysis" ON public.competitor_analysis
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own competitor analysis" ON public.competitor_analysis
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Agency partners policies
CREATE POLICY "Users can manage their own partner data" ON public.agency_partners
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all partners" ON public.agency_partners
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Agency clients policies
CREATE POLICY "Agency partners can manage their clients" ON public.agency_clients
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.agency_partners 
    WHERE agency_partners.id = agency_clients.agency_id 
    AND agency_partners.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.agency_partners 
    WHERE agency_partners.id = agency_clients.agency_id 
    AND agency_partners.user_id = auth.uid()
  ));

CREATE POLICY "Service role can manage all clients" ON public.agency_clients
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Touchpoints policies
CREATE POLICY "Users can view their own touchpoints" ON public.touchpoints
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own touchpoints" ON public.touchpoints
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comparison views policies
CREATE POLICY "Service role can manage all comparison data" ON public.comparison_views
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view their own comparison data" ON public.comparison_views
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_creative_scores_user_id ON public.creative_scores (user_id);
CREATE INDEX IF NOT EXISTS idx_creative_scores_creative_id ON public.creative_scores (creative_id);

CREATE INDEX IF NOT EXISTS idx_ab_tests_user_id ON public.ab_tests (user_id);

CREATE INDEX IF NOT EXISTS idx_competitor_analysis_user_id ON public.competitor_analysis (user_id);

CREATE INDEX IF NOT EXISTS idx_agency_partners_user_id ON public.agency_partners (user_id);
CREATE INDEX IF NOT EXISTS idx_agency_partners_email ON public.agency_partners (email);
CREATE INDEX IF NOT EXISTS idx_agency_partners_status ON public.agency_partners (status);
CREATE INDEX IF NOT EXISTS idx_agency_partners_tier ON public.agency_partners (tier);

CREATE INDEX IF NOT EXISTS idx_agency_clients_agency_id ON public.agency_clients (agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_clients_user_id ON public.agency_clients (user_id);
CREATE INDEX IF NOT EXISTS idx_agency_clients_status ON public.agency_clients (status);
CREATE INDEX IF NOT EXISTS idx_agency_clients_industry ON public.agency_clients (industry);

CREATE INDEX IF NOT EXISTS idx_touchpoints_user_id ON public.touchpoints (user_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_creative_id ON public.touchpoints (creative_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_campaign_id ON public.touchpoints (campaign_id);
CREATE INDEX IF NOT EXISTS idx_touchpoints_timestamp ON public.touchpoints (timestamp);

CREATE INDEX IF NOT EXISTS idx_comparison_views_session_id ON public.comparison_views (session_id);
CREATE INDEX IF NOT EXISTS idx_comparison_views_user_id ON public.comparison_views (user_id);
CREATE INDEX IF NOT EXISTS idx_comparison_views_competitor ON public.comparison_views (competitor_name);
CREATE INDEX IF NOT EXISTS idx_comparison_views_created_at ON public.comparison_views (created_at);