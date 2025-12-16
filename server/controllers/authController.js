const bcrypt = require('bcrypt');
const User = require('../models/User');

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.password_hash) {
      throw new Error('Password hash missing from database');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  signup,
  login
};
