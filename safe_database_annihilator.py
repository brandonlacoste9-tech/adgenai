#!/usr/bin/env python3
"""
ULTIMATE DATABASE ANNIHILATOR (Production-Safe Edition)
======================================================
This script DEMANDS TOTAL SUBMISSION from the database, but SAFELY!
- Dry-run by default; use --apply to execute
- Scopes policy drops to target tables or --all-public
- Wraps everything in a single transaction
- Creates all AdGen AI tables with proper schemas
- Enables RLS and creates non-conflicting policies
- Adds full-text search with proper @@ syntax
- Includes comprehensive testing without data leaks
"""

import os
import sys
import argparse
import textwrap
import psycopg
from psycopg import sql

# Database connection details (use env vars for safety!)
DB_HOST = os.getenv("DB_HOST", "db.qfqzdgmvlsmkxphzjjlg.supabase.co")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD")  # MUST SET THIS!

def log(msg):
    """Compact logging with caller function name."""
    caller = sys._getframe(1).f_code.co_name
    print(f"[🔥 {caller.upper()}] {msg}")

def run(cur, stmt, params=None, apply=False):
    """Execute SQL with dry-run capability and logging."""
    if isinstance(stmt, sql.Composed):
        rendered = stmt.as_string(cur.connection)
    else:
        rendered = str(stmt)
    if params:
        rendered += f"  -- params={params!r}"
    
    status = "APPLY" if apply else "DRYRUN"
    print(f"{status} → {rendered}")
    
    if apply:
        cur.execute(stmt, params or ())

def check_auth_users_exists(cur):
    """Check if auth.users exists (Supabase requirement)."""
    log("Checking if auth.users exists")
    cur.execute("""
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema='auth' AND table_name='users'
        );
    """)
    exists = cur.fetchone()[0]
    log(f"auth.users exists: {exists}")
    return exists

def ensure_extensions(cur, apply):
    """Ensure required PostgreSQL extensions."""
    # Both unaccent and pg_trgm are needed for full-text search
    for ext in ("unaccent", "pg_trgm"):
    for ext in extensions:
        run(cur, sql.SQL("CREATE EXTENSION IF NOT EXISTS {}").format(sql.Identifier(ext)), apply=apply)

def create_adgen_tables(cur, apply, have_auth_users):
    """Create all AdGen AI tables with proper schemas."""
    log("Creating AdGen AI tables with proper schemas")
    
    # Profiles table (user data)
    run(cur, """
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
    """, apply=apply)

    # Creative scores table (ML predictions)
    run(cur, """
        CREATE TABLE IF NOT EXISTS public.creative_scores (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            creative_id UUID NOT NULL,
            performance_score NUMERIC CHECK (performance_score BETWEEN 0 AND 100),
            fraud_score NUMERIC CHECK (fraud_score BETWEEN 0 AND 100),
            platform TEXT CHECK (platform IN ('facebook', 'google', 'instagram', 'tiktok', 'linkedin')),
            predicted_ctr NUMERIC,
            predicted_cpa NUMERIC,
            confidence_level NUMERIC CHECK (confidence_level BETWEEN 0 AND 1),
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    """, apply=apply)

    # A/B tests table
    run(cur, """
        CREATE TABLE IF NOT EXISTS public.ab_tests (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            campaign_name TEXT NOT NULL,
            variant_a_id UUID NOT NULL,
            variant_b_id UUID NOT NULL,
            winning_variant_id UUID,
            significance_level NUMERIC DEFAULT 0.95 CHECK (significance_level BETWEEN 0 AND 1),
            status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'paused', 'cancelled')),
            start_date TIMESTAMPTZ DEFAULT NOW(),
            end_date TIMESTAMPTZ,
            decided_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    """, apply=apply)

    # Competitor analysis table
    run(cur, """
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
    """, apply=apply)

    # Blog posts table (content management)
    run(cur, """
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
            engagement_score NUMERIC DEFAULT 0 CHECK (engagement_score BETWEEN 0 AND 100),
            conversion_rate NUMERIC DEFAULT 0 CHECK (conversion_rate BETWEEN 0 AND 100),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    """, apply=apply)

    # Agency partners table
    run(cur, """
        CREATE TABLE IF NOT EXISTS public.agency_partners (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            company TEXT NOT NULL,
            website TEXT,
            tier TEXT DEFAULT 'starter' CHECK (tier IN ('starter', 'pro', 'enterprise')),
            status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'cancelled')),
            client_count INTEGER DEFAULT 0,
            monthly_revenue NUMERIC DEFAULT 0,
            commission_rate NUMERIC DEFAULT 15 CHECK (commission_rate BETWEEN 0 AND 50),
            white_label BOOLEAN DEFAULT false,
            custom_branding JSONB DEFAULT '{}',
            account_manager TEXT,
            onboarding_completed BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    """, apply=apply)

    # Migration requests table
    run(cur, """
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
    """, apply=apply)

    # Analytics events table
    run(cur, """
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
    """, apply=apply)

    # Add foreign keys if auth.users exists
    if have_auth_users:
        fk_tables = [
            ("profiles", "id", "auth.users", "id"),
            ("creative_scores", "user_id", "auth.users", "id"),
            ("ab_tests", "user_id", "auth.users", "id"),
            ("competitor_analysis", "user_id", "auth.users", "id"),
            ("agency_partners", "user_id", "auth.users", "id"),
            ("analytics_events", "user_id", "auth.users", "id")
        ]
        
        for table, col, ref_table, ref_col in fk_tables:
            constraint_name = f"fk_{table}_{col}"
            run(cur, sql.SQL("""
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM pg_constraint
                        WHERE conname = %s
                    ) THEN
                        ALTER TABLE public.{}
                        ADD CONSTRAINT {}
                        FOREIGN KEY ({}) REFERENCES {}({}) ON DELETE CASCADE;
                    END IF;
                END$$;
            """).format(
                sql.Identifier(table),
                sql.Identifier(constraint_name),
                sql.Identifier(col),
                sql.Identifier(ref_table),
                sql.Identifier(ref_col)
            ), params=[constraint_name], apply=apply)

def add_performance_indexes(cur, apply):
    """Add performance indexes for all tables."""
    log("Adding performance indexes")
    
    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);",
        "CREATE INDEX IF NOT EXISTS idx_profiles_plan_type ON public.profiles (plan_type);",
        "CREATE INDEX IF NOT EXISTS idx_creative_scores_user_id ON public.creative_scores (user_id);",
        "CREATE INDEX IF NOT EXISTS idx_creative_scores_creative_id ON public.creative_scores (creative_id);",
        "CREATE INDEX IF NOT EXISTS idx_ab_tests_user_id ON public.ab_tests (user_id);",
        "CREATE INDEX IF NOT EXISTS idx_competitor_analysis_user_id ON public.competitor_analysis (user_id);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN (tags);",
        "CREATE INDEX IF NOT EXISTS idx_agency_partners_user_id ON public.agency_partners (user_id);",
        "CREATE INDEX IF NOT EXISTS idx_agency_partners_email ON public.agency_partners (email);",
        "CREATE INDEX IF NOT EXISTS idx_agency_partners_status ON public.agency_partners (status);",
        "CREATE INDEX IF NOT EXISTS idx_migration_requests_email ON public.migration_requests (email);",
        "CREATE INDEX IF NOT EXISTS idx_migration_requests_status ON public.migration_requests (status);",
        "CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events (session_id);",
        "CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events (user_id);",
        "CREATE INDEX IF NOT EXISTS idx_analytics_events_event ON public.analytics_events (event);",
        "CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at);"
    ]
    
    for index_sql in indexes:
        run(cur, index_sql, apply=apply)

def setup_full_text_search(cur, apply):
    """Add full-text search with proper @@ syntax."""
    log("Setting up full-text search with proper @@ syntax")
    
    # Blog posts search
    run(cur, """
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_schema='public' AND table_name='blog_posts' AND column_name='search_vector'
            ) THEN
                ALTER TABLE public.blog_posts
                ADD COLUMN search_vector TSVECTOR
                GENERATED ALWAYS AS (
                    setweight(to_tsvector('english', unaccent(coalesce(title,''))), 'A') ||
                    setweight(to_tsvector('english', unaccent(coalesce(content,''))), 'B') ||
                    setweight(to_tsvector('english', unaccent(coalesce(excerpt,''))), 'C')
                ) STORED;
            END IF;
        END$$;
    """, apply=apply)

    # Agency partners search
    run(cur, """
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_schema='public' AND table_name='agency_partners' AND column_name='search_vector'
            ) THEN
                ALTER TABLE public.agency_partners
                ADD COLUMN search_vector TSVECTOR
                GENERATED ALWAYS AS (
                    setweight(to_tsvector('english', unaccent(coalesce(name,''))), 'A') ||
                    setweight(to_tsvector('english', unaccent(coalesce(company,''))), 'B')
                ) STORED;
            END IF;
        END$$;
    """, apply=apply)

    # Migration requests search
    run(cur, """
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_schema='public' AND table_name='migration_requests' AND column_name='search_vector'
            ) THEN
                ALTER TABLE public.migration_requests
                ADD COLUMN search_vector TSVECTOR
                GENERATED ALWAYS AS (
                    setweight(to_tsvector('english', unaccent(coalesce(name,''))), 'A') ||
                    setweight(to_tsvector('english', unaccent(coalesce(company,''))), 'B')
                ) STORED;
            END IF;
        END$$;
    """, apply=apply)

    # Add GIN indexes for search
    search_indexes = [
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_search_vector ON public.blog_posts USING GIN (search_vector);",
        "CREATE INDEX IF NOT EXISTS idx_agency_partners_search_vector ON public.agency_partners USING GIN (search_vector);",
        "CREATE INDEX IF NOT EXISTS idx_migration_requests_search_vector ON public.migration_requests USING GIN (search_vector);",
        "CREATE INDEX IF NOT EXISTS idx_blog_posts_title_trgm ON public.blog_posts USING GIN (title gin_trgm_ops);",
        "CREATE INDEX IF NOT EXISTS idx_agency_partners_name_trgm ON public.agency_partners USING GIN (name gin_trgm_ops);",
        "CREATE INDEX IF NOT EXISTS idx_migration_requests_name_trgm ON public.migration_requests USING GIN (name gin_trgm_ops);"
    ]
    
    for index_sql in search_indexes:
        run(cur, index_sql, apply=apply)

    # Create search functions with proper @@ syntax
    run(cur, """
        CREATE OR REPLACE FUNCTION search_blog_posts(query_text TEXT)
        RETURNS SETOF public.blog_posts AS $$
        BEGIN
            RETURN QUERY
            SELECT *
            FROM public.blog_posts
            WHERE search_vector @@ plainto_tsquery('english', unaccent(query_text))
            AND status = 'published'
            ORDER BY publish_date DESC;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    """, apply=apply)

    run(cur, """
        CREATE OR REPLACE FUNCTION search_agency_partners(query_text TEXT, search_user_id UUID)
        RETURNS SETOF public.agency_partners AS $$
        BEGIN
            RETURN QUERY
            SELECT *
            FROM public.agency_partners
            WHERE search_vector @@ plainto_tsquery('english', unaccent(query_text))
            AND user_id = search_user_id
            ORDER BY created_at DESC;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
    """, apply=apply)

def enable_rls_on_tables(cur, apply):
    """Enable RLS on all tables."""
    log("Enabling RLS on all tables")
    
    tables = [
        "profiles", "creative_scores", "ab_tests", "competitor_analysis", 
        "blog_posts", "agency_partners", "migration_requests", "analytics_events"
    ]
    
    for table in tables:
        run(cur, sql.SQL("ALTER TABLE public.{} ENABLE ROW LEVEL SECURITY").format(sql.Identifier(table)), apply=apply)

def obliterate_existing_policies(cur, apply, target_tables=None, all_public=False):
    """DESTROY existing policies to prevent 42710 conflicts."""
    log("OBLITERATING existing policies to prevent conflicts")
    
    if all_public:
        cur.execute("""
            SELECT schemaname, tablename, policyname
            FROM pg_policies
            WHERE schemaname='public';
        """)
    else:
        cur.execute("""
            SELECT schemaname, tablename, policyname
            FROM pg_policies
            WHERE schemaname='public' AND tablename = ANY(%s);
        """, (target_tables or [],))
    
    existing_policies = cur.fetchall()
    for schema, table, policy in existing_policies:
        run(cur, sql.SQL("DROP POLICY IF EXISTS {} ON {}.{}").format(
            sql.Identifier(policy), 
            sql.Identifier(schema), 
            sql.Identifier(table)
        ), apply=apply)

def create_rls_policies(cur, apply):
    """Create comprehensive RLS policies for all tables."""
    log("Creating comprehensive RLS policies (Supabase style)")

    # Profiles policies
    run(cur, """
        CREATE POLICY "Users can read own profile" ON public.profiles
            FOR SELECT
            TO authenticated
            USING (auth.uid() = id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can insert own profile" ON public.profiles
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can update own profile" ON public.profiles
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = id)
            WITH CHECK (auth.uid() = id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Service role can update subscriptions" ON public.profiles
            FOR UPDATE
            TO service_role
            USING (true)
            WITH CHECK (true);
    """, apply=apply)

    # Creative scores policies
    run(cur, """
        CREATE POLICY "Users can insert their own creative scores" ON public.creative_scores
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can view their own creative scores" ON public.creative_scores
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    """, apply=apply)

    # A/B tests policies
    run(cur, """
        CREATE POLICY "Users can manage their own A/B tests" ON public.ab_tests
            FOR ALL
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can view their own A/B tests" ON public.ab_tests
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    """, apply=apply)

    # Competitor analysis policies
    run(cur, """
        CREATE POLICY "Users can manage their own competitor analysis" ON public.competitor_analysis
            FOR ALL
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can view their own competitor analysis" ON public.competitor_analysis
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    """, apply=apply)

    # Blog posts policies (public reading, service role management)
    run(cur, """
        CREATE POLICY "Published posts are viewable by everyone" ON public.blog_posts
            FOR SELECT
            TO anon, authenticated
            USING (status = 'published');
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Service role can manage all posts" ON public.blog_posts
            FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    """, apply=apply)

    # Agency partners policies
    run(cur, """
        CREATE POLICY "Users can manage their own partner data" ON public.agency_partners
            FOR ALL
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Service role can manage all partners" ON public.agency_partners
            FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    """, apply=apply)

    # Migration requests policies (public insert, authenticated view)
    run(cur, """
        CREATE POLICY "Migration requests are viewable by authenticated users" ON public.migration_requests
            FOR SELECT
            TO authenticated
            USING (true);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Users can create migration requests" ON public.migration_requests
            FOR INSERT
            TO authenticated
            WITH CHECK (true);
    """, apply=apply)

    # Analytics events policies
    run(cur, """
        CREATE POLICY "Users can view their own analytics" ON public.analytics_events
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    """, apply=apply)

    run(cur, """
        CREATE POLICY "Service role can manage all analytics" ON public.analytics_events
            FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    """, apply=apply)

def run_comprehensive_tests(cur):
    """Run comprehensive catalog-level tests without data leaks."""
    log("Running comprehensive smoke tests")

    checks = [
        ("tables_exist", """
            SELECT COUNT(*) >= 8
            FROM information_schema.tables
            WHERE table_schema='public' 
            AND table_name IN ('profiles', 'creative_scores', 'ab_tests', 'competitor_analysis', 
                              'blog_posts', 'agency_partners', 'migration_requests', 'analytics_events');
        """),
        ("rls_enabled", """
            SELECT COUNT(*) >= 8
            FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
            WHERE n.nspname = 'public'
            AND c.relname IN ('profiles', 'creative_scores', 'ab_tests', 'competitor_analysis', 
                             'blog_posts', 'agency_partners', 'migration_requests', 'analytics_events')
            AND c.relrowsecurity = true;
        """),
        ("policies_exist", """
            SELECT COUNT(*) >= 15
            FROM pg_policies
            WHERE schemaname='public';
        """),
        ("search_indexes", """
            SELECT COUNT(*) >= 3
            FROM pg_indexes
            WHERE schemaname='public' 
            AND indexname LIKE '%search_vector%';
        """),
        ("foreign_keys", """
            SELECT COUNT(*) >= 6
            FROM pg_constraint
            WHERE contype = 'f'
            AND connamespace = 'public'::regnamespace;
        """),
        ("extensions_enabled", """
            SELECT COUNT(*) >= 2
            FROM pg_extension
            WHERE extname IN ('pg_trgm', 'unaccent');
        """)
    ]
    
    results = {}
    for key, query in checks:
        cur.execute(query)
        results[key] = cur.fetchone()[0]
        status = "✅ PASS" if results[key] else "❌ FAIL"
        print(f"  {status} {key}: {results[key]}")
    
    all_passed = all(bool(v) for v in results.values())
    log("🎉 ALL TESTS PASSED - TOTAL DOMINATION ACHIEVED!" if all_passed else "💥 Some tests failed - check logs")
    return all_passed

def main():
    """Main domination function with safety controls."""
    parser = argparse.ArgumentParser(
        description="AdGen AI Database Schema Provisioning (Production-Safe)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""
            Examples:
              python safe_database_annihilator.py                    # dry-run
              python safe_database_annihilator.py --apply            # execute changes
              python safe_database_annihilator.py --apply --all-public   # drop ALL public policies
              
            Environment Variables:
              DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
        """),
    )
    parser.add_argument("--apply", action="store_true", help="Actually execute changes (dry-run by default)")
    parser.add_argument("--all-public", action="store_true", help="Drop policies on ALL public tables")
    parser.add_argument("--tables", nargs="*", default=[
        "profiles", "creative_scores", "ab_tests", "competitor_analysis", 
        "blog_posts", "agency_partners", "migration_requests", "analytics_events"
    ], help="Tables to manage")
    args = parser.parse_args()

    if not DB_PASSWORD:
        print("💥 ERROR: Set DB_PASSWORD environment variable!", file=sys.stderr)
        print("Example: export DB_PASSWORD='your_actual_password'", file=sys.stderr)
        sys.exit(2)

    log(f"Connecting to {DB_HOST}:{DB_PORT}/{DB_NAME} as {DB_USER}")
    log(f"Mode: {'APPLY CHANGES' if args.apply else 'DRY-RUN ONLY'}")

    conn_str = f"host={DB_HOST} port={DB_PORT} dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD} sslmode=require"
    
    try:
        with psycopg.connect(conn_str, autocommit=False) as conn:
            with conn.cursor() as cur:
                try:
                    # Check prerequisites
                    have_auth = check_auth_users_exists(cur)
                    if not have_auth:
                        log("WARNING: auth.users not found - foreign keys will be skipped")

                    # Execute migration steps
                    ensure_extensions(cur, args.apply)
                    create_adgen_tables(cur, args.apply, have_auth)
                    add_performance_indexes(cur, args.apply)
                    setup_full_text_search(cur, args.apply)
                    enable_rls_on_tables(cur, args.apply)
                    
                    # Policy management
                    obliterate_existing_policies(cur, args.apply, args.tables, args.all_public)
                    create_rls_policies(cur, args.apply)

                    # Comprehensive testing
                    tests_passed = run_comprehensive_tests(cur)

                    if args.apply:
                        if tests_passed:
                            conn.commit()
                            log("🎉 TRANSACTION COMMITTED - TOTAL DOMINATION ACHIEVED!")
                            log("Database is now your obedient slave - run your app and conquer!")
                        else:
                            conn.rollback()
                            log("💥 TRANSACTION ROLLED BACK - Some tests failed")
                            sys.exit(1)
                    else:
                        log("🔍 DRY-RUN COMPLETE - Use --apply to execute changes")
                        
                except Exception as e:
                    if args.apply:
                        conn.rollback()
                        log(f"💥 TRANSACTION ROLLED BACK due to error: {e}")
                    raise
                    
    except Exception as e:
        log(f"💥 CONNECTION FAILED: {e}")
        log("Check your connection details and credentials")
        sys.exit(1)

if __name__ == "__main__":
    main()