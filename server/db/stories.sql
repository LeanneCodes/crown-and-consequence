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
    password VARCHAR(255) NOT NULL
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
    image TEXT,
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

-- for authentication
-- create table post

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

-- USERS
INSERT INTO users (username, email, password_hash)
VALUES
('student1', 'student1@example.com', 'hashed_password_1'),
('student2', 'student2@example.com', 'hashed_password_2');

-- STORIES
INSERT INTO stories (title, description)
VALUES
(
  'Crown & Consequence: The Battle of 1066',
  'Explore the power struggle following Edward the Confessor’s death and the decisive battles that shaped Norman England.'
),
(
  'Crown & Consequence: Tudor England',
  'Learn key Tudor history decisions through interactive storytelling.'
),
(
  'Crown & Consequence: The English Civil War',
  'Navigate political and religious tensions between Parliament and the monarchy during England’s civil war.'
),
(
  'Crown & Consequence: The Roman Invasion of Britain',
  'Experience Roman expansion into Britain and the resistance faced from local tribes.'
),
(
  'Crown & Consequence: The Industrial Revolution',
  'Discover how industrialisation transformed society, work, and daily life in Britain.'
),
(
  'Crown & Consequence: The French Revolution',
  'Follow the collapse of the French monarchy and the rise of revolutionary ideas and power.'
),
(
  'Crown & Consequence: The British Empire',
  'Examine the expansion of British influence and the consequences for nations across the world.'
),
(
  'Crown & Consequence: World War One',
  'Understand the causes, key events, and global impact of the First World War.'
),
(
  'Crown & Consequence: World War Two',
  'Make critical decisions during the most destructive conflict in modern history.'
),
(
  'Crown & Consequence: The Cold War',
  'Explore global tension, espionage, and ideological conflict in the post-war world.'
);


-- CHARACTERS (Battle of 1066)
INSERT INTO characters (story_id, name, description, image)
VALUES
(
  1,
  'Harold Godwinson',
  'The last Anglo-Saxon King of England, killed at the Battle of Hastings.',
  'https://upload.wikimedia.org/wikipedia/commons/3/3c/Harold_Godwinson_Bayeux_Tapestry.jpg'
),
(
  1,
  'William of Normandy',
  'Duke of Normandy who claimed the English throne and became William the Conqueror.',
  'https://upload.wikimedia.org/wikipedia/commons/5/5e/William_the_Conqueror_Bayeux_Tapestry.jpg'
),
(
  1,
  'Edward the Confessor',
  'King of England whose death without an heir triggered the succession crisis.',
  'https://upload.wikimedia.org/wikipedia/commons/9/9d/Edward_the_Confessor.jpg'
),
(
  1,
  'Harald Hardrada',
  'King of Norway who invaded England and was defeated at the Battle of Stamford Bridge.',
  'https://upload.wikimedia.org/wikipedia/commons/4/4a/Harald_Hardrada.jpg'
),
(
  1,
  'Tostig Godwinson',
  'Harold Godwinson’s exiled brother who allied with Harald Hardrada.',
  'https://upload.wikimedia.org/wikipedia/commons/0/0c/Tostig_Godwinson.jpg'
),
(
  1,
  'Edgar Ætheling',
  'The last male heir of the House of Wessex, briefly proclaimed king but never crowned.',
  'https://upload.wikimedia.org/wikipedia/commons/1/1a/Edgar_Aetheling.jpg'
),
(
  1,
  'Bishop Odo of Bayeux',
  'Half-brother of William of Normandy who supported the invasion and appears in the Bayeux Tapestry.',
  'https://upload.wikimedia.org/wikipedia/commons/7/77/Odo_of_Bayeux_Bayeux_Tapestry.jpg'
),
(
  1,
  'Gyrth Godwinson',
  'Brother of Harold Godwinson who fought and died at the Battle of Hastings.',
  'https://upload.wikimedia.org/wikipedia/commons/6/63/Gyrth_Godwinson_Bayeux_Tapestry.jpg'
),
(
  1,
  'Leofwine Godwinson',
  'Another brother of Harold Godwinson who was killed fighting the Normans.',
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/Leofwine_Godwinson.jpg'
),
(
  1,
  'Ealdred of York',
  'Archbishop who crowned Harold Godwinson and later Edgar Ætheling.',
  'https://upload.wikimedia.org/wikipedia/commons/8/8a/Ealdred_of_York.jpg'
);


-- SCENES (Harold Godwinson – Battle of 1066)
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
    'Edward the Confessor has died without a clear heir. As Earl of Wessex, Harold Godwinson claims that Edward promised him the throne.',
    'What should Harold do next?',
    'Accept the crown and become King of England',
    'Step aside and support another claimant',
    'A',
    'Correct. Harold was crowned King in January 1066.',
    'Incorrect. Harold chose to claim the throne himself.',
    0,
    FALSE
),
(
    1,
    2,
    'Harold learns that his brother Tostig has allied with the Norwegian king Harald Hardrada and invaded northern England.',
    'How should Harold respond to this threat?',
    'March north immediately to confront the invaders',
    'Remain in the south to defend against Normandy',
    'A',
    'Correct. Harold marched north and defeated the Norwegians at Stamford Bridge.',
    'Incorrect. Ignoring the northern invasion would weaken his rule.',
    0,
    FALSE
),
(
    1,
    3,
    'Only days after victory in the north, Harold is told that William of Normandy has landed on the south coast.',
    'What decision must Harold now make?',
    'Rest his army before facing William',
    'Force march south to confront William immediately',
    'B',
    'Correct. Harold rushed south, leaving his army exhausted.',
    'Incorrect. Harold did not delay his response.',
    0,
    FALSE
),
(
    1,
    4,
    'Harold’s army meets William’s forces at the Battle of Hastings. The fighting is fierce and lasts all day.',
    'What is the outcome of the battle?',
    'Harold defeats William and secures his crown',
    'Harold is killed and William claims the throne',
    'B',
    'Correct. Harold was killed, and William became King of England.',
    'Incorrect. Harold did not survive the battle.',
    0,
    TRUE
);