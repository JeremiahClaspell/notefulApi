const path = require("path");
const express = require("express");
const jsonParser = express.json();
const notesRouter = express.Router();
const notesService = require("./notesService");

notesRouter
  .route("/")
  .get((req, res, next) => {
    const knex = req.app.get("db");
    notesService.getAllNotes(knex).then(notes => {
      //convert folder id to string to work with client template
      const newNotes = notes.map(note => {
        const newId = note.folderid.toString();
        note.folderId = newId;
        delete note.folderid;
        const newNoteId = note.id.toString();
        note.id = newNoteId;
        return note;
      });
      res.json(newNotes);
    });
  })
  .post((req, res, next) => {
    const knex = req.app.get("db");
    const body = req.body;
    notesService
      .addNote(knex, body)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

notesRouter.route("/:id").delete((req, res, next) => {
  const { id } = req.params;
  const knex = res.app.get("db");
  notesService.deleteNoteById(knex, id).then(note => {
    res.send(200);
  });
});

module.exports = notesRouter;
