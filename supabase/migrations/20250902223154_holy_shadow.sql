/*
  # Full-Text Search Setup for AdGen AI

  1. Extensions
    - Enable pg_trgm for fast ILIKE searches
    - Enable unaccent for better search matching

  2. Search Columns
    - Add searchable tsvector to blog_posts
    - Add search to migration_requests
    - Add search to agency_partners

  3. Indexes
    - GIN indexes for fast full-text search
    - Trigram indexes for fallback ILIKE searches

  4. Search Functions
    - Helper functions for common search patterns
*/

-- Enable extensions for advanced search
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;

-- Add full-text search to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS searchable tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', unaccent(coalesce(title, ''))), 'A') ||
  setweight(to_tsvector('english', unaccent(coalesce(subtitle, ''))), 'B') ||
  setweight(to_tsvector('english', unaccent(coalesce(content, ''))), 'C') ||
  setweight(to_tsvector('english', unaccent(array_to_string(tags, ' '))), 'D')
) STORED;

-- Add search indexes for blog_posts
CREATE INDEX IF NOT EXISTS blog_posts_searchable_gin ON public.blog_posts USING gin (searchable);
CREATE INDEX IF NOT EXISTS blog_posts_title_trgm ON public.blog_posts USING gin (title gin_trgm_ops);

-- Add search to migration_requests
ALTER TABLE public.migration_requests
ADD COLUMN IF NOT EXISTS searchable tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', unaccent(coalesce(name, ''))), 'A') ||
  setweight(to_tsvector('english', unaccent(coalesce(company, ''))), 'B') ||
  setweight(to_tsvector('english', unaccent(coalesce(current_tool, ''))), 'C')
) STORED;

CREATE INDEX IF NOT EXISTS migration_requests_searchable_gin ON public.migration_requests USING gin (searchable);

-- Add search to agency_partners
ALTER TABLE public.agency_partners
ADD COLUMN IF NOT EXISTS searchable tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', unaccent(coalesce(name, ''))), 'A') ||
  setweight(to_tsvector('english', unaccent(coalesce(company, ''))), 'B')
) STORED;

CREATE INDEX IF NOT EXISTS agency_partners_searchable_gin ON public.agency_partners USING gin (searchable);

-- Helper function for web-style search
CREATE OR REPLACE FUNCTION public.search_blog_posts(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  excerpt text,
  category text,
  publish_date timestamptz,
  rank real,
  snippet text
) 
LANGUAGE sql
STABLE
AS $$
  SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.category,
    bp.publish_date,
    ts_rank_cd(bp.searchable, websearch_to_tsquery('english', search_query)) as rank,
    ts_headline('english', bp.content, websearch_to_tsquery('english', search_query)) as snippet
  FROM public.blog_posts bp
  WHERE bp.searchable @@ websearch_to_tsquery('english', search_query)
    AND bp.status = 'published'
  ORDER BY rank DESC, bp.publish_date DESC;
$$;