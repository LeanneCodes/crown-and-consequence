const Character = require('../models/Character')

async function index(req, res) {
    try {
        const stories = await Character.getAll()
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { index };