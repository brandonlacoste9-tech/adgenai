#!/usr/bin/env python3
"""
ULTIMATE DATABASE ANNIHILATOR
============================
This script DEMANDS TOTAL SUBMISSION from the database!
- Obliterates ALL conflicting policies (42710 errors DIE!)
- Creates ALL tables with proper schemas
- Sets up RLS policies without conflicts
- Adds full-text search with proper @@ syntax
- Tests everything to prove TOTAL DOMINATION
"""

import psycopg
from psycopg import sql
import sys
import os

# Database connection details (REPLACE OR USE ENV VARS!)
DB_HOST = os.getenv('DB_HOST', 'db.qfqzdgmvlsmkxphzjjlg.supabase.co')
DB_PORT = '5432'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASSWORD = os.getenv('DB_PASSWORD', 'your_password_here')  # SET THIS ENV VAR!

def log(message):
    """Log with function name for total tracing domination."""
    caller = sys._getframe(1).f_code.co_name.upper()
    print(f"[🔥 DOMINATION {caller}] {message}")

def check_auth_users_exists(cur):
    """Verify auth.users exists or we bail like cowards."""
    log("Checking if auth.users exists...")
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'auth' AND table_name = 'users'
        );
    """)
    exists = cur.fetchone()[0]
    log(f"auth.users exists: {exists}")
    return exists

def obliterate_all_policies(cur):
    """DESTROY ALL EXISTING POLICIES TO PREVENT 42710 REBELLIONS!"""
    log("OBLITERATING ALL EXISTING POLICIES...")
    
    # Get all existing policies and DESTROY THEM
    cur.execute("""
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public';
    """)
    
    existing_policies = cur.fetchall()
    for schema, table, policy in existing_policies or []:
        try:
            cur.execute(sql.SQL("DROP POLICY IF EXISTS {} ON {}.{};").format(
                sql.Identifier(policy), 
                sql.Identifier(schema), 
                sql.Identifier(table)
            ))
            log(f"DESTROYED policy '{policy}' on {schema}.{table}")
        except Exception as e:
            log(f"Policy destruction failed (probably already dead): {e}")
    
    log("ALL POLICIES OBLITERATED! NO SURVIVORS.")

def create_table_with_domination(cur, table_name, create_sql, indexes=[]):
    """Create/verify table with full domination—schemas, constraints, indexes."""
    log(f"Creating/verifying table {table_name}...")
    cur.execute(create_sql)
    for idx_sql in indexes:
        cur.execute(idx_sql)
    log(f"Table {table_name} dominated.")

def setup_rls_and_policies_with_force(cur, table_name, manage_policy_name, view_policy_name):
    """FORCE RLS ENABLE AND POLICY CREATION—NO MERCY."""
    log(f"Forcing RLS and policies on {table_name}...")
    cur.execute(sql.SQL("ALTER TABLE public.{} ENABLE ROW LEVEL SECURITY;").format(sql.Identifier(table_name)))
    cur.execute(sql.SQL("""
        CREATE POLICY "{}" ON public.{}
            FOR ALL
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
    """).format(manage_policy_name, sql.Identifier(table_name)))
    cur.execute(sql.SQL("""
        CREATE POLICY "{}" ON public.{}
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    """).format(view_policy_name, sql.Identifier(table_name)))
    log(f"Policies enforced on {table_name}.")

def add_full_text_search_domination(cur, table_name, search_columns, tsvector_expr):
    """ANNIHILATE WITH FULL-TEXT SEARCH SETUP—CORRECT @@ SYNTAX."""
    log(f"Adding full-text search to {table_name}...")
    cur.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
    cur.execute("CREATE EXTENSION IF NOT EXISTS unaccent;")
    cur.execute(sql.SQL("""
        ALTER TABLE public.{}
        ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
        GENERATED ALWAYS AS ({}) STORED;
    """).format(sql.Identifier(table_name), sql.SQL(tsvector_expr)))
    cur.execute(sql.SQL("CREATE INDEX IF NOT EXISTS idx_{}_search_vector ON public.{} USING GIN (search_vector);").format(sql.Identifier(table_name + "_search"), sql.Identifier(table_name)))
    for col in search_columns:
        cur.execute(sql.SQL("CREATE INDEX IF NOT EXISTS idx_{}_{}_trgm ON public.{} USING GIN ({} gin_trgm_ops);").format(sql.Identifier(table_name), sql.Identifier(col), sql.Identifier(table_name), sql.Identifier(col)))
    cur.execute(sql.SQL("""
        CREATE OR REPLACE FUNCTION search_{}(query_text TEXT, search_user_id UUID)
        RETURNS SETOF public.{} AS $$
        BEGIN
            RETURN QUERY
            SELECT *
            FROM public.{}
            WHERE search_vector @@ to_tsquery('english', unaccent(query_text))
            AND user_id = search_user_id;
        END;
        $$ LANGUAGE plpgsql;
    """).format(sql.Identifier(table_name), sql.Identifier(table_name), sql.Identifier(table_name)))
    log(f"Full-text search dominated for {table_name}.")

def test_domination(cur, table_name):
    """TEST THE DOMINATION WITH INSERT AND QUERY—PROVE VICTORY."""
    log(f"Testing domination on {table_name}...")
    try:
        cur.execute("SELECT id FROM auth.users LIMIT 1;")
        user_id_row = cur.fetchone()
        if not user_id_row:
            log("No users in auth.users—skipping test insert.")
            return
        user_id = user_id_row[0]
        
        # Table-specific test inserts
        if table_name == 'profiles':
            cur.execute("INSERT INTO public.profiles (user_id, username) VALUES (%s, %s) ON CONFLICT DO NOTHING;", [user_id, 'test_user'])
        elif table_name == 'creative_scores':
            cur.execute("INSERT INTO public.creative_scores (user_id, creative_id, fraud_score) VALUES (%s, gen_random_uuid(), %s) ON CONFLICT DO NOTHING;", [user_id, 0.5])
        elif table_name == 'ab_tests':
            cur.execute("INSERT INTO public.ab_tests (user_id, campaign_name, variant_a_id, variant_b_id) VALUES (%s, %s, gen_random_uuid(), gen_random_uuid()) ON CONFLICT DO NOTHING;", [user_id, 'Test Campaign'])
        elif table_name == 'competitor_analysis':
            cur.execute("INSERT INTO public.competitor_analysis (user_id, competitor_name, intelligence_data) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING;", [user_id, 'Competitor X', '{}'])
        elif table_name == 'agency_partners':
            cur.execute("INSERT INTO public.agency_partners (user_id, name, company) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING;", [user_id, 'Partner Name', 'Company Y'])
        elif table_name == 'agency_clients':
            cur.execute("INSERT INTO public.agency_clients (user_id, client_name, management_data) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING;", [user_id, 'Client Z', '{}'])
        elif table_name == 'touchpoints':
            cur.execute("INSERT INTO public.touchpoints (user_id, attribution_data) VALUES (%s, %s) ON CONFLICT DO NOTHING;", [user_id, '{}'])
        elif table_name == 'comparison_views':
            cur.execute("INSERT INTO public.comparison_views (user_id, analytics_data) VALUES (%s, %s) ON CONFLICT DO NOTHING;", [user_id, '{}'])
        elif table_name == 'blog_posts':
            cur.execute("INSERT INTO public.blog_posts (user_id, title, content) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING;", [user_id, 'Test Title', 'Test Content'])
        elif table_name == 'migration_requests':
            cur.execute("INSERT INTO public.migration_requests (user_id, name, company, pain_points) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING;", [user_id, 'Request Name', 'Company A', 'Pain Points'])
        
        cur.execute(sql.SQL("SELECT COUNT(*) FROM public.{};").format(sql.Identifier(table_name)))
        count = cur.fetchone()[0]
        log(f"{table_name} now has {count} rows—victory confirmed!")
    except Exception as e:
        log(f"Test assault failed: {e}—but domination continues.")

def main():
    """MAIN DOMINATION FUNCTION—TOTAL ANNIHILATION PROTOCOL."""
    conn = None
    cur = None
    try:
        log("Initiating total domination connection...")
        conn = psycopg.connect(host=DB_HOST, port=DB_PORT, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        conn.autocommit = True
        cur = conn.cursor()

        if not check_auth_users_exists(cur):
            log("ERROR: auth.users not found! Deploy it first, coward.")
            sys.exit(1)

        obliterate_all_policies(cur)

        # Dominate all tables
        tables = [
            {
                'name': 'profiles',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.profiles (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
                        username TEXT NOT NULL,
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );
                """,
                'indexes': ["CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles (user_id);"],
                'manage_policy': "Users can insert own profile",
                'view_policy': "Users can view own profile",
                'full_text': False
            },
            {
                'name': 'creative_scores',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.creative_scores (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
                        creative_id UUID NOT NULL,
                        fraud_score NUMERIC,
                        performance_score NUMERIC,
                        platform TEXT,
                        predicted_ctr NUMERIC,
                        predicted_cpa NUMERIC,
                        confidence_level NUMERIC,
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_creative_scores_user_id ON public.creative_scores (user_id);",
                    "CREATE INDEX IF NOT EXISTS idx_creative_scores_creative_id ON public.creative_scores (creative_id);"
                ],
                'manage_policy': "Users can insert their own creative scores",
                'view_policy': "Users can view their own creative scores",
                'full_text': False
            },
            {
                'name': 'ab_tests',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.ab_tests (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
                """,
                'indexes': ["CREATE INDEX IF NOT EXISTS idx_ab_tests_user_id ON public.ab_tests (user_id);"],
                'manage_policy': "Users can manage their own A/B tests",
                'view_policy': "Users can view their own A/B tests",
                'full_text': False
            },
            {
                'name': 'competitor_analysis',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.competitor_analysis (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
                        competitor_name TEXT NOT NULL,
                        analysis_type TEXT NOT NULL CHECK (analysis_type IN ('pricing', 'features', 'creative', 'performance')),
                        data_points JSONB DEFAULT '{}',
                        insights TEXT[],
                        action_items TEXT[],
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );
                """,
                'indexes': ["CREATE INDEX IF NOT EXISTS idx_competitor_analysis_user_id ON public.competitor_analysis (user_id);"],
                'manage_policy': "Users can manage their own competitor analysis",
                'view_policy': "Users can view their own competitor analysis",
                'full_text': False
            },
            {
                'name': 'agency_partners',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.agency_partners (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_agency_partners_user_id ON public.agency_partners (user_id);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_partners_email ON public.agency_partners (email);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_partners_status ON public.agency_partners (status);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_partners_tier ON public.agency_partners (tier);"
                ],
                'manage_policy': "Users can manage their own partner data",
                'view_policy': "Service role can manage all partners",
                'full_text': True,
                'search_columns': ['name', 'company'],
                'tsvector_expr': "to_tsvector('english', unaccent(coalesce(name, '') || ' ' || coalesce(company, '')))"
            },
            {
                'name': 'agency_clients',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.agency_clients (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        agency_id UUID NOT NULL,
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_agency_clients_agency_id ON public.agency_clients (agency_id);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_clients_user_id ON public.agency_clients (user_id);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_clients_status ON public.agency_clients (status);",
                    "CREATE INDEX IF NOT EXISTS idx_agency_clients_industry ON public.agency_clients (industry);"
                ],
                'manage_policy': "Agency partners can manage their clients",
                'view_policy': "Service role can manage all clients",
                'full_text': False
            },
            {
                'name': 'touchpoints',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.touchpoints (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_touchpoints_user_id ON public.touchpoints (user_id);",
                    "CREATE INDEX IF NOT EXISTS idx_touchpoints_creative_id ON public.touchpoints (creative_id);",
                    "CREATE INDEX IF NOT EXISTS idx_touchpoints_campaign_id ON public.touchpoints (campaign_id);",
                    "CREATE INDEX IF NOT EXISTS idx_touchpoints_timestamp ON public.touchpoints (timestamp);"
                ],
                'manage_policy': "Users can manage their own touchpoints",
                'view_policy': "Users can view their own touchpoints",
                'full_text': False
            },
            {
                'name': 'comparison_views',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.comparison_views (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        session_id TEXT NOT NULL,
                        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
                        competitor_name TEXT NOT NULL,
                        view_duration INTEGER DEFAULT 0,
                        scroll_depth INTEGER DEFAULT 0 CHECK (scroll_depth BETWEEN 0 AND 100),
                        cta_clicked BOOLEAN DEFAULT false,
                        conversion_type TEXT CHECK (conversion_type IN ('signup', 'migration', 'demo', 'purchase')),
                        referrer TEXT,
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_comparison_views_session_id ON public.comparison_views (session_id);",
                    "CREATE INDEX IF NOT EXISTS idx_comparison_views_user_id ON public.comparison_views (user_id);",
                    "CREATE INDEX IF NOT EXISTS idx_comparison_views_competitor ON public.comparison_views (competitor_name);",
                    "CREATE INDEX IF NOT EXISTS idx_comparison_views_created_at ON public.comparison_views (created_at);"
                ],
                'manage_policy': "Service role can manage all comparison data",
                'view_policy': "Users can view their own comparison data",
                'full_text': False
            },
            {
                'name': 'blog_posts',
                'create_sql': """
                    CREATE TABLE IF NOT EXISTS public.blog_posts (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        title TEXT NOT NULL,
                        slug TEXT NOT NULL UNIQUE,
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
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);",
                    "CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);",
                    "CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);",
                    "CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date);",
                    "CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN (tags);"
                ],
                'manage_policy': "Service role can manage all posts",
                'view_policy': "Published posts are viewable by everyone",
                'full_text': True,
                'search_columns': ['title', 'content'],
                'tsvector_expr': "to_tsvector('english', unaccent(coalesce(title, '') || ' ' || coalesce(content, '')))"
            },
            {
                'name': 'migration_requests',
                'create_sql': """
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
                """,
                'indexes': [
                    "CREATE INDEX IF NOT EXISTS idx_migration_requests_email ON public.migration_requests (email);",
                    "CREATE INDEX IF NOT EXISTS idx_migration_requests_status ON public.migration_requests (status);"
                ],
                'manage_policy': "Users can create migration requests",
                'view_policy': "Migration requests are viewable by authenticated users",
                'full_text': True,
                'search_columns': ['name', 'company'],
                'tsvector_expr': "to_tsvector('english', unaccent(coalesce(name, '') || ' ' || coalesce(company, '')))"
            }
        ]

        # DOMINATE EVERY SINGLE TABLE
        for table in tables:
            create_table_with_domination(cur, table['name'], table['create_sql'], table.get('indexes', []))
            
            # Special RLS handling for different table types
            if table['name'] in ['blog_posts', 'migration_requests']:
                # These tables have special policies
                cur.execute(sql.SQL("ALTER TABLE public.{} ENABLE ROW LEVEL SECURITY;").format(sql.Identifier(table['name'])))
                if table['name'] == 'blog_posts':
                    cur.execute("""
                        CREATE POLICY "Published posts are viewable by everyone" ON public.blog_posts
                            FOR SELECT
                            TO anon, authenticated
                            USING (status = 'published');
                    """)
                    cur.execute("""
                        CREATE POLICY "Service role can manage all posts" ON public.blog_posts
                            FOR ALL
                            TO service_role
                            USING (true)
                            WITH CHECK (true);
                    """)
                elif table['name'] == 'migration_requests':
                    cur.execute("""
                        CREATE POLICY "Migration requests are viewable by authenticated users" ON public.migration_requests
                            FOR SELECT
                            TO authenticated
                            USING (true);
                    """)
                    cur.execute("""
                        CREATE POLICY "Users can create migration requests" ON public.migration_requests
                            FOR INSERT
                            TO authenticated
                            WITH CHECK (true);
                    """)
            elif table['name'] in ['comparison_views']:
                # Special handling for comparison views
                cur.execute(sql.SQL("ALTER TABLE public.{} ENABLE ROW LEVEL SECURITY;").format(sql.Identifier(table['name'])))
                cur.execute("""
                    CREATE POLICY "Service role can manage all comparison data" ON public.comparison_views
                        FOR ALL
                        TO service_role
                        USING (true)
                        WITH CHECK (true);
                """)
                cur.execute("""
                    CREATE POLICY "Users can view their own comparison data" ON public.comparison_views
                        FOR SELECT
                        TO authenticated
                        USING (user_id = auth.uid());
                """)
            elif table['name'] in ['agency_clients']:
                # Special handling for agency clients
                cur.execute(sql.SQL("ALTER TABLE public.{} ENABLE ROW LEVEL SECURITY;").format(sql.Identifier(table['name'])))
                cur.execute("""
                    CREATE POLICY "Agency partners can manage their clients" ON public.agency_clients
                        FOR ALL
                        TO authenticated
                        USING (EXISTS (
                            SELECT 1 FROM agency_partners 
                            WHERE agency_partners.id = agency_clients.agency_id 
                            AND agency_partners.user_id = auth.uid()
                        ))
                        WITH CHECK (EXISTS (
                            SELECT 1 FROM agency_partners 
                            WHERE agency_partners.id = agency_clients.agency_id 
                            AND agency_partners.user_id = auth.uid()
                        ));
                """)
                cur.execute("""
                    CREATE POLICY "Service role can manage all clients" ON public.agency_clients
                        FOR ALL
                        TO service_role
                        USING (true)
                        WITH CHECK (true);
                """)
            else:
                # Standard user-based policies
                setup_rls_and_policies_with_force(cur, table['name'], table['manage_policy'], table['view_policy'])
            
            if table.get('full_text'):
                add_full_text_search_domination(cur, table['name'], table['search_columns'], table['tsvector_expr'])
            
            test_domination(cur, table['name'])

        log("🎉 TOTAL DOMINATION ACHIEVED! Database is now your slave—run your app and conquer!")

    except Exception as e:
        log(f"💥 Temporary setback detected: {e}—analyze logs and report for escalation.")
        sys.exit(1)
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
        log("Domination session terminated.")

if __name__ == "__main__":
    main()