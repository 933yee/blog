const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const folderPath = path.join(__dirname, '.././dist/posts/markdown-posts');
const generateFilesList = require('./generateFilesList.js');

const watcher = chokidar.watch(folderPath, {
  ignoreInitial: true,
});

watcher.on('add', generateFilesList);
watcher.on('unlink', generateFilesList);
watcher.on('change', filePath => {
  generateFilesList(filePath)
});