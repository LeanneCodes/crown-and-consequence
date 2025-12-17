TRUNCATE stories RESTART IDENTITY CASCADE;

INSERT INTO stories (id, title, description, is_active)
VALUES
  (1, 'Test Story', 'A story used for testing', TRUE);
