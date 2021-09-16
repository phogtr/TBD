CREATE DATABASE PostgresNextSass;

-- @block add extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- @block create table
CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4(),
  username TEXT NOT NULL,
  user_email TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  PRIMARY KEY(user_id)
);

-- @block insert
INSERT INTO users (username, user_email, user_password)
VALUES ('test', 'a@a.a', 'abc123');


-- @block select user by email
SELECT * FROM users WHERE user_email = 'a@a.a';


-- @block select all
select * from users;


-- @block delete
delete from users
where username = 'bob';


-- @block drop table
DROP TABLE users