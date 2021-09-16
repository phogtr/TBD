CREATE DATABASE PostgresNextSass;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);


INSERT INTO users (username, user_email, user_password)
VALUES('test', 'a@a.a', 'abc123');

select * from users;

delete from users where username = 'test';