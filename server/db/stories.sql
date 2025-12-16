-- TABLES
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS scenes CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);


-- STORIES

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);


-- CHARACTERS

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    story_id INT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);


-- SCENES

CREATE TABLE scenes (
    id SERIAL PRIMARY KEY,
    character_id INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    scene_order INT NOT NULL,
    narrative TEXT NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    correct_option CHAR(1) CHECK (correct_option IN ('A', 'B')),
    feedback_correct TEXT,
    feedback_wrong TEXT,
    points INT DEFAULT 0,
    is_final BOOLEAN DEFAULT FALSE
);


-- PROGRESS

CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    story_id INT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    character_id INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    current_scene_id INT REFERENCES scenes(id),
    score INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    UNIQUE (user_id, story_id, character_id)
);


-- DUMMY DATA
-- USERS
INSERT INTO users (username, email, password_hash)
VALUES
('student1', 'student1@example.com', 'hashed_password_1'),
('student2', 'student2@example.com', 'hashed_password_2');

-- STORIES
INSERT INTO stories (title, description)
VALUES
('Crown & Consequence: Tudor England', 'Learn key Tudor history decisions through interactive storytelling.');

-- CHARACTERS
INSERT INTO characters (story_id, name, description)
VALUES
(1, 'Henry VIII', 'King of England navigating power, marriage, and religion.');

-- SCENES
INSERT INTO scenes (
    character_id,
    scene_order,
    narrative,
    question,
    option_a,
    option_b,
    correct_option,
    feedback_correct,
    feedback_wrong,
    points,
    is_final
)
VALUES
(
    1,
    1,
    'Henry VIII seeks a male heir and is frustrated with his marriage to Catherine of Aragon.',
    'What should Henry do?',
    'Remain loyal to the Catholic Church',
    'Break from Rome to remarry',
    'B',
    'Correct. This led to the English Reformation.',
    'Incorrect. This would not solve his succession issue.',
    10,
    FALSE
),
(
    1,
    2,
    'England has broken from Rome and established the Church of England.',
    'What is the long-term consequence?',
    'Religious instability',
    'Immediate peace across Europe',
    'A',
    'Correct. England faced decades of religious turmoil.',
    'Incorrect. Europe remained deeply divided.',
    15,
    TRUE
);

-- PROGRESS
INSERT INTO progress (
    user_id,
    story_id,
    character_id,
    current_scene_id,
    score,
    completed
)
VALUES
(1, 1, 1, 1, 10, FALSE),
(2, 1, 1, NULL, 0, FALSE);
