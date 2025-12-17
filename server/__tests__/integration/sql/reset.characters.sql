TRUNCATE characters, stories RESTART IDENTITY CASCADE;

-- Story
INSERT INTO stories (id, title)
VALUES (1, 'Test Story');

-- Characters
INSERT INTO characters (id, story_id, name, description)
VALUES
  (1, 1, 'Hero', 'Main character'),
  (2, 1, 'Villain', 'Antagonist');
