const express =  require('express');
const { addNote, getNoteById, getNotes, updateNote, deleteNote } = require('../Controller/note');

const routerNote = express();
routerNote.post("/notes", addNote);
routerNote.get("/notes", getNotes);
routerNote.get("/notes/:id", getNoteById)
routerNote.put("/notes/:id", updateNote)
routerNote.delete("/notes/:id", deleteNote);
module.exports = routerNote;