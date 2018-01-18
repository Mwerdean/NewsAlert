CREATE TABLE phone_database (
    id SERIAL,
    number TEXT UNIQUE
);


CREATE TABLE users_fullstack_auth (
    id SERIAL,
    auth0_id TEXT,
    email TEXT,
    pictureUrl TEXT,
    name TEXT
);

CREATE TABLE create_post (
    id SERIAL,
    auth0_id TEXT,
    title TEXT,
    content TEXT
);