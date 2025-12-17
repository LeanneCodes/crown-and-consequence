TRUNCATE progress, scenes, characters, stories, users
RESTART IDENTITY CASCADE;

-- User
INSERT INTO users (id, username, email, password)
VALUES (1, 'testuser', 'test@example.com', 'hashedpassword');

-- Story
INSERT INTO stories (id, title)
VALUES (1, 'Test Story');

-- Character
INSERT INTO characters (id, story_id, name)
VALUES (1, 1, 'Hero');

-- Scene
INSERT INTO scenes (
  id,
  character_id,
  scene_order,
  narrative,
  question,
  option_a,
  option_b,
  correct_option,
  is_final
)
VALUES (
  1,
  1,
  1,
  'Test narrative',
  'Choose wisely',
  'A',
  'B',
  'A',
  FALSE
);

-- Progress
INSERT INTO progress (
  user_id,
  story_id,
  character_id,
  current_scene_id,
  score,
  completed
)
VALUES (
  1,
  1,
  1,
  1,
  10,
  FALSE
);
