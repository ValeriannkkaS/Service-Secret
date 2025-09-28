ALTER TABLE secret_table
DROP COLUMN link;

ALTER TABLE secret_table
    ADD COLUMN allow_deletions BOOLEAN NOT NULL DEFAULT FALSE;