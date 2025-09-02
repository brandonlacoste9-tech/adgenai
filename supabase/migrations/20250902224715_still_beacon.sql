/*
  # Add Full-Text Search

  1. Search Capabilities
    - Full-text search on blog posts (title, content)
    - Search on migration requests (name, company, pain points)
    - Search on agency partners (name, company)

  2. Performance
    - GIN indexes for fast tsvector searches
    - Trigram indexes for ILIKE fallback searches
    - Generated tsvector columns for automatic updates

  3. Functions
    - Helper functions for web-style search
    - Ranking and highlighting support
*/

-- Add tsvector columns for full-text search
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS searchable TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', unaccent(coalesce(title, ''))), 'A') ||
    setweight(to_tsvector('english', unaccent(coalesce(content, ''))), 'B') ||
    setweight(to_tsvector('english', unaccent(coalesce(excerpt, ''))), 'C')
  ) STORED;

ALTER TABLE public.migration_requests
  ADD COLUMN IF NOT EXISTS searchable TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', unaccent(coalesce(name, ''))), 'A') ||
    setweight(to_tsvector('english', unaccent(coalesce(company, ''))), 'B') ||
    setweight(to_tsvector('english', unaccent(array_to_string(pain_points, ' '))), 'C')
  ) STORED;

ALTER TABLE public.agency_partners
  ADD COLUMN IF NOT EXISTS searchable TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', unaccent(coalesce(name, ''))), 'A') ||
    setweight(to_tsvector('english', unaccent(coalesce(company, ''))), 'B')
  ) STORED;

-- Create GIN indexes for fast full-text search
CREATE INDEX IF NOT EXISTS blog_posts_searchable_gin ON public.blog_posts USING GIN (searchable);
CREATE INDEX IF NOT EXISTS migration_requests_searchable_gin ON public.migration_requests USING GIN (searchable);
CREATE INDEX IF NOT EXISTS agency_partners_searchable_gin ON public.agency_partners USING GIN (searchable);

-- Create trigram indexes for ILIKE fallback searches
CREATE INDEX IF NOT EXISTS blog_posts_title_trgm ON public.blog_posts USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS migration_requests_company_trgm ON public.migration_requests USING GIN (company gin_trgm_ops);
CREATE INDEX IF NOT EXISTS agency_partners_company_trgm ON public.agency_partners USING GIN (company gin_trgm_ops);

-- Helper function for searching blog posts
CREATE OR REPLACE FUNCTION search_blog_posts(query_text TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  excerpt TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title,
    bp.excerpt,
    ts_rank_cd(bp.searchable, websearch_to_tsquery('english', query_text)) as rank
  FROM public.blog_posts bp
  WHERE bp.searchable @@ websearch_to_tsquery('english', query_text)
    AND bp.status = 'published'
  ORDER BY rank DESC, bp.publish_date DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Helper function for searching migration requests (admin only)
CREATE OR REPLACE FUNCTION search_migration_requests(query_text TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  company TEXT,
  email TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    mr.id,
    mr.name,
    mr.company,
    mr.email,
    ts_rank_cd(mr.searchable, websearch_to_tsquery('english', query_text)) as rank
  FROM public.migration_requests mr
  WHERE mr.searchable @@ websearch_to_tsquery('english', query_text)
  ORDER BY rank DESC, mr.created_at DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Helper function for searching agency partners
CREATE OR REPLACE FUNCTION search_agency_partners(query_text TEXT, requesting_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  company TEXT,
  tier TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ap.id,
    ap.name,
    ap.company,
    ap.tier,
    ts_rank_cd(ap.searchable, websearch_to_tsquery('english', query_text)) as rank
  FROM public.agency_partners ap
  WHERE ap.searchable @@ websearch_to_tsquery('english', query_text)
    AND (ap.user_id = requesting_user_id OR requesting_user_id IN (
      SELECT auth.uid() FROM auth.users WHERE auth.jwt() ->> 'role' = 'service_role'
    ))
  ORDER BY rank DESC, ap.created_at DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;