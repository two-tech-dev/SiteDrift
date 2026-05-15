-- Bypass statistics table
-- Stores each bypass event for analytics
CREATE TABLE IF NOT EXISTS bypass_stats (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(254) NOT NULL,
    ext_version VARCHAR(20) DEFAULT '',
    bypassed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_bypass_stats_domain ON bypass_stats (domain);
CREATE INDEX IF NOT EXISTS idx_bypass_stats_bypassed_at ON bypass_stats (bypassed_at);
