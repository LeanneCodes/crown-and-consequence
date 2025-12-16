const Character = require('../models/Character')

async function index(req, res) {
    try {
        const stories = await Character.getAll()
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getOne(req, res) {
    try {
        const data = req.params.id
        const stories = await Character.getByStoryId(data)
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { index, getOne };