const notesService = {
  getAllNotes(knex) {
    return knex.from("notes");
  },
  deleteNoteById(knex, id) {
    return knex.from("notes").where({ id }).delete();
  },
  addNote(knex, body) {
    return knex
      .insert({
        name: body.name,
        content: body.content,
        folderid: body.folderId,
        modified: body.modified,
      })
      .into("notes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
};

module.exports = notesService;
