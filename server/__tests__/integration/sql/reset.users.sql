TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users (id, username, email, password)
VALUES
  (1, 'testuser', 'testuser@example.com', 'hashedpassword'),
  (2, 'anotheruser', 'another@example.com', 'hashedpassword2');
