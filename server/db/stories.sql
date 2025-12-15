DROP TABLE story IF EXIST
DROP TABLE user IF EXIST
DROP TABLE character IF EXIST
DROP TABLE scene IF EXIST
DROP TABLE question IF EXIST
DROP TABLE answer IF EXIST

CREATE TABLE story
story_id	 INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
story_name	VARCHAR(100)
description	
img	

CREATE TABLE user(
user_id	INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
user_name	VARCHAR(20) NOT NULL
email	VARCHAR(20) NOT NULL UNIQUE
score	INT DEFAULT 0
password	VARCHAR(20)
charter_id	FOREIGN KEY)


CREATE TABLE scene (
scene_id (pk)
scene_name
scene_overview
story_name (fk)
character_id (fk)
)

CREATE TABLE characer(
character_id (pk)
character_name
story_name
historical_role
nationality

)


CREATE TABLE question(
question_id	INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
story_name	FOREIGN KEY
q1	VARCHAR(255) NOT NULL
q2	VARCHAR(255) NOT NULL
q3	VARCHAR(255) NOT NULL

)


CREATE TABLE answer(	
answer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
question_id	FOREIGN KEY
option_a	VARCHAR(255) NOT NULL
option_b	VARCHAR(255) NOT NULL
option_c	VARCHAR(255) NOT NULL
correct_answer	VARCHAR(255) NOT NULL
)