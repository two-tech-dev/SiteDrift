CREATE TABLE IF NOT EXISTS links (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(255),
    path VARCHAR(2047),
    destination VARCHAR(4095),
    times_reported INTEGER NOT NULL DEFAULT 0,
    hashed_IP CHAR(64),
    votedfordeletion BOOLEAN DEFAULT false,
    voted_by VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS recycle_bin (
    id INTEGER PRIMARY KEY,
    domain VARCHAR(255),
    path VARCHAR(2047),
    destination VARCHAR(4095),
    times_reported INTEGER NOT NULL DEFAULT 0,
    hashed_IP CHAR(64),
    votedfordeletion BOOLEAN DEFAULT false,
    voted_by VARCHAR(255),
    note VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS admin_creds (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password CHAR(60),
    token_id VARCHAR(255)
);
