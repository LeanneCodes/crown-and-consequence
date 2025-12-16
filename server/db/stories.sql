DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS character;
DROP TABLE IF EXISTS story;

CREATE TABLE story (
    story_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    story_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(1000) NOT NULL,
    img VARCHAR(100)
    character_id INT,
    FOREIGN KEY (character_id) REFERENCES character(character_id)
);

CREATE TABLE character (
    character_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    character_name VARCHAR(100) NOT NULL UNIQUE,
    historical_role VARCHAR(100) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    story_id INT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(story_id)
);

CREATE TABLE "user" (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    score INT DEFAULT 0,
    password VARCHAR(20) NOT NULL,
    character_id INT,
    FOREIGN KEY (character_id) REFERENCES character(character_id)
);


CREATE TABLE question (
    question_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    story_id INT NOT NULL,
    q1 VARCHAR(255) NOT NULL,
    q2 VARCHAR(255) NOT NULL,
    q3 VARCHAR(255) NOT NULL,
    q4 VARCHAR(255) NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(story_id)
);

CREATE TABLE answer (
    answer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(question_id)
);



INSERT INTO story(story_name, description, img)
VALUES('Story of Harold Godwison - 1066', 'In 1066, England stood on the edge of great change. Harold Godwinson had just been crowned king after the death of Edward the Confessor, a moment that brought both honor and uncertainty. Though supported by the English nobles, Harold knew his position was fragile. Across the Channel, powerful rulers watched closely, believing the English throne should belong to them.

Harold was an experienced leader, shaped by years of warfare and political struggle. When news reached him that an enemy army had landed in the north, he gathered his forces and marched quickly to meet the threat. The campaign tested his endurance and leadership, but his army’s discipline and resolve carried them through the fighting.

Peace did not last. Soon after returning south, Harold learned that another invasion had begun. Despite exhaustion, he chose to confront the new danger immediately. The two armies met near the southern coast, where strategy and determination would decide England’s future. By the end of the day, the fate of the kingdom had changed forever, marking the end of one era and the beginning of another.', 'https://avid-archer.com/wp-content/uploads/2024/07/the-Battle-of-Stamford-Bridge-in-1066.webp')

INSERT INTO character(character_name, historical_role, nationality, story_id)
VALUES ('Harold Godwinson', 'King of England', 'English', 1);

-- INSERT INTO scene (scene_name, scene_overview, story_id, character_id)
-- VALUES()

INSERT INTO question(q1, q2, q3, q4, story_id)
VALUES("Which foreign ruler claimed that he had been promised the English throne?",
 "What military tactic was famously used by the English army during Harold's final battle?", 
 "On what exact date did Harold's final battle take place?",
 "What long-term cultural changes followed the end of Anglo-Saxon rule in England?", 1)

INSERT INTO answer(option_a, option_b, correct_answer, question_id)
VALUES
('William, Duke of Normandy', 'Harald Hardrada of Norway', 'William, Duke of Normandy', 1);
('A tightly packed shield wall', 'Cavalry charges using armored knights', 'A tightly packed shield wall', 2);
('October 14, 1066', 'September 25, 1066', 'October 14, 1066', 3);
('The introduction of Norman language and customs into English society', 
 "England's conversion from Christianity to pagan beliefs", 
 'The introduction of Norman language and customs into English society', 4);

