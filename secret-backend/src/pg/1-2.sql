CREATE TABLE secret_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    encrypted_value TEXT NOT NULL,
    iv TEXT NOT NULL ,
    link TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    remaining_views_count INTEGER DEFAULT 0
);