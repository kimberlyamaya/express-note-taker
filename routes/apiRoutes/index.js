const router = require('express').Router();
const { db } = require('../../db/db.json');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", (err,data) => {
        const notes = JSON.parse(data)
        res.json(notes)
    })
});

router.post("/notes", function (req, res) {
    // read first
    fs.readFile("./db/db.json", (err,data) => {
        // parse
        const notes = JSON.parse(data)
        // assigning id
        // ... spread operater
        let newNote = {...req.body, id:uuidv4()}
        notes.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
            //if (err) throw err;
            res.json(req.body)
        })
    })


});


//extra
router.delete("/notes/:id", function (req, res) {
    // fs.readfile
    fs.readFile("./db/db.json", (err,data) => {
        // parse data
        const notes = JSON.parse(data)
        // loop thru data and delete matching note on id
        const findNoteId = notes.find(i => i.id === req.params.id)
        const IndexNoteId = notes.indexOf(findNoteId)
        notes.splice(IndexNoteId)
        // resave w/ fs.write file the stringified notes
        fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
            //if (err) throw err;
            // when write file is done send back notes
            res.json(notes)    
          }); 
    })
});

module.exports = router;