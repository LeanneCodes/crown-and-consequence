TRUNCATE progress, scenes, characters, stories, users RESTART IDENTITY;

-- USERS
INSERT INTO users (username, email, password)
VALUES
  ('Luke', 'Luke@example.com', 'password1'),
  ('Brian', 'Brian@example.com', 'password2');

-- STORIES
INSERT INTO stories (title, description)
VALUES
  ('Battle of 1066', 'Norman conquest storyline'),
  ('French Revolution', 'Revolutionary storyline');

-- CHARACTERS
INSERT INTO characters (story_id, name, description, image)
VALUES
  (1, 'Harold Godwinson', 'English king', NULL),
  (1, 'William the Conqueror', 'Norman duke', NULL),
  (2, 'Robespierre', 'Leader of revolution', NULL);

-- SCENES
INSERT INTO scenes (
  character_id, scene_order, image, narrative, question,
  option_a, option_b, correct_option, feedback_correct,
  feedback_wrong, points, is_final
)
VALUES
  (1, 1, NULL, 'Scene 1 narrative', 'Question 1?', 'A', 'B', 'A', 'Correct!', 'Wrong!', 10, FALSE),
  (1, 2, NULL, 'Scene 2 narrative', 'Question 2?', 'A', 'B', 'B', 'Correct!', 'Wrong!', 15, TRUE),
  (2, 1, NULL, 'Scene 3 narrative', 'Question 3?', 'A', 'B', 'A', 'Correct!', 'Wrong!', 5, TRUE);

-- PROGRESS
INSERT INTO progress (user_id, story_id, character_id, current_scene_id, score, completed)
VALUES
  (1, 1, 1, 1, 10, FALSE),
  (1, 2, 3, 3, 20, TRUE);
