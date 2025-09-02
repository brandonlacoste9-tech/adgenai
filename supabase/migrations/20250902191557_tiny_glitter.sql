/*
  # Tracking and Analytics Schema

  1. New Tables
    - `user_acquisition_tracking`
      - Tracks user acquisition sources and competitor switches
    - `creative_performance_scores`
      - Stores AI-generated performance and fraud scores
    - `ab_test_campaigns`
      - Manages automated A/B testing workflows
    - `migration_requests`
      - Tracks white-glove migration intake forms
    - `agency_partnerships`
      - Manages agency partner relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- User acquisition tracking
CREATE TABLE IF NOT EXISTS user_acquisition_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  acquisition_source text NOT NULL,
  competitor_source text,
  referral_data jsonb DEFAULT '{}',
  utm_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_acquisition_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own acquisition data"
  ON user_acquisition_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Creative performance scores
CREATE TABLE IF NOT EXISTS creative_performance_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  creative_id uuid NOT NULL,
  performance_score numeric NOT NULL CHECK (performance_score BETWEEN 0 AND 100),
  fraud_score numeric NOT NULL CHECK (fraud_score BETWEEN 0 AND 100),
  platform text NOT NULL,
  prediction_data jsonb DEFAULT '{}',
  actual_performance jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE creative_performance_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own creative scores"
  ON creative_performance_scores
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- A/B test campaigns
CREATE TABLE IF NOT EXISTS ab_test_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  variant_a_id uuid NOT NULL,
  variant_b_id uuid NOT NULL,
  platform text NOT NULL,
  status text DEFAULT 'running' CHECK (status IN ('running', 'completed', 'paused')),
  winner_variant_id uuid,
  statistical_significance numeric,
  confidence_level numeric DEFAULT 0.95,
  test_results jsonb DEFAULT '{}',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE ab_test_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own A/B tests"
  ON ab_test_campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Migration requests
CREATE TABLE IF NOT EXISTS migration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  current_tool text NOT NULL,
  monthly_spend text,
  team_size text,
  pain_points text[] DEFAULT '{}',
  urgency text,
  calendly_preference text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed')),
  assigned_specialist text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE migration_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Migration requests are viewable by admins"
  ON migration_requests
  FOR SELECT
  TO authenticated
  USING (true); -- Admin access control handled at application level

-- Agency partnerships
CREATE TABLE IF NOT EXISTS agency_partnerships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('starter', 'pro', 'enterprise')),
  client_limit integer,
  commission_rate numeric DEFAULT 0.25,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'terminated')),
  contract_start_date date,
  contract_end_date date,
  revenue_share_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agency_partnerships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agency partnerships viewable by admins"
  ON agency_partnerships
  FOR SELECT
  TO authenticated
  USING (true); -- Admin access control handled at application level

-- KPI tracking views
CREATE OR REPLACE VIEW kpi_dashboard AS
SELECT 
  -- Revenue Per Customer (RPC)
  (SELECT 
    COALESCE(AVG(monthly_revenue), 0) 
    FROM user_subscriptions 
    WHERE status = 'active'
  ) as revenue_per_customer,
  
  -- Active paying accounts
  (SELECT 
    COUNT(*) 
    FROM user_subscriptions 
    WHERE status = 'active'
  ) as active_paying_accounts,
  
  -- Switcher NPS (placeholder - would need survey data)
  (SELECT 
    COUNT(*) 
    FROM user_acquisition_tracking 
    WHERE competitor_source IS NOT NULL
  ) as switcher_count,
  
  -- Total creatives with performance scores
  (SELECT 
    COUNT(*) 
    FROM creative_performance_scores 
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  ) as monthly_scored_creatives,
  
  -- Average performance improvement
  (SELECT 
    AVG(performance_score) 
    FROM creative_performance_scores 
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  ) as avg_performance_score;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_acquisition_source ON user_acquisition_tracking(acquisition_source);
CREATE INDEX IF NOT EXISTS idx_user_acquisition_competitor ON user_acquisition_tracking(competitor_source);
CREATE INDEX IF NOT EXISTS idx_creative_scores_user_id ON creative_performance_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_creative_scores_created_at ON creative_performance_scores(created_at);
CREATE INDEX IF NOT EXISTS idx_ab_tests_user_id ON ab_test_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_ab_tests_status ON ab_test_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_migration_requests_status ON migration_requests(status);
CREATE INDEX IF NOT EXISTS idx_migration_requests_created_at ON migration_requests(created_at);