const folderService = {
  getAllFolders(knex) {
    return knex.from('folders');
  },
  enterFolder(knex, name) {
    return knex
      .insert([{ name }])
      .into('folders')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = folderService;
