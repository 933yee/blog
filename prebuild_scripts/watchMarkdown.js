const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const folderPath = path.join(__dirname, '.././dist/posts/markdown-posts'); // 替换为你的文件夹路径

const generateFilesList = () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    const fileNames = files.filter(file => file.endsWith('.md')).reverse();
    const fileContent = `export default ${JSON.stringify(fileNames)};`;

    fs.writeFile(path.join(__dirname, '../src/settings', 'files.js'), fileContent, err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('File list generated successfully!');
    });
  });
};

const watcher = chokidar.watch(folderPath, {
  ignoreInitial: true
});

watcher.on('add', generateFilesList);
watcher.on('unlink', generateFilesList);

