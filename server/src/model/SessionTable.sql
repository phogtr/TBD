-- @block create table
CREATE TABLE session(
  user_id UUID NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  valid_session BOOLEAN DEFAULT FALSE,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE
);

--9d6e139d-eb40-4663-9817-46d6191d6169
-- @block insert
INSERT INTO session (user_id)
VALUES ('9d6e139d-eb40-4663-9817-46d6191d6169') 


-- @block drop table
DROP TABLE session 


-- @block delete session
DELETE from session 
where user_id = '9d6e139d-eb40-4663-9817-46d6191d6169'


-- @block select 
select * from session