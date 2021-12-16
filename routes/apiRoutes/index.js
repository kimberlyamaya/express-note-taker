const router = require('express').Router();
const { db } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    db
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
});

router.post("/notes", function (req, res) {
    db
    .addNote(req.body)
    .then((notes) => res.json(notes))
    .catch(err => res.status(500).json(err))
});

router.delete("/notes/:title", function (req, res) {
    db
    .deleteNotes(req.params.title)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err))
});

module.exports = router;