const path = require('path');
const express = require('express');
const jsonParser = express.json();
const folderRouter = express.Router();
const folderService = require('./folderService');

folderRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    folderService.getAllFolders(knexInstance).then((folders) => {
      const newFolders = folders.map((folder) => {
        const newFolderId = folder.id.toString();
        folder.id = newFolderId;
        return folder;
      });
      res.json(newFolders);
    });
  })
  .post((req, res, next) => {
    const knex = req.app.get('db');
    const { name } = req.body;
    folderService.enterFolder(knex, name).then((folder) => {
      res.status(200).json(folder);
    });
  });

module.exports = folderRouter;
