CREATE TABLE secrets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    value TEXT NOT NULL,
    iv BYTEA NOT NULL ,
    expires_at TIMESTAMP WITH TIME ZONE,
    remaining_views_count INTEGER DEFAULT,
);