/*
  # Create Competitor Analysis Table

  1. New Tables
    - `competitor_analysis`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `competitor_name` (text)
      - `analysis_type` (text, enum: pricing, features, creative, performance)
      - `data_points` (jsonb, stores analysis data)
      - `insights` (text array, key findings)
      - `action_items` (text array, recommended actions)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `competitor_analysis` table
    - Add policy for users to manage their own analysis
    - Add policy for users to view their own analysis

  3. Indexes
    - Index on user_id for fast user queries
    - Check constraint for valid analysis types
*/

CREATE TABLE IF NOT EXISTS competitor_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  competitor_name text NOT NULL,
  analysis_type text NOT NULL,
  data_points jsonb NOT NULL DEFAULT '{}',
  insights text[],
  action_items text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE competitor_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own competitor analysis"
  ON competitor_analysis
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own competitor analysis"
  ON competitor_analysis
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_competitor_analysis_user_id ON competitor_analysis(user_id);

ALTER TABLE competitor_analysis ADD CONSTRAINT competitor_analysis_analysis_type_check 
  CHECK (analysis_type IN ('pricing', 'features', 'creative', 'performance'));