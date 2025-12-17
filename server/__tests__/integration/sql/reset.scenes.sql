TRUNCATE scenes, characters, stories RESTART IDENTITY CASCADE;

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
  feedback_correct,
  feedback_wrong,
  points,
  is_final
)
VALUES (
  1,
  1,
  1,
  'Test narrative',
  'What do you do?',
  'Option A',
  'Option B',
  'A',
  'Correct choice',
  'Wrong choice',
  10,
  FALSE
);
