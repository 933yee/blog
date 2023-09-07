const fs = require('fs');
const path = require('path');
function generateFilesList(updatedFilePath) {
    return new Promise((resolve, reject) => {
        const folderPath = path.join(__dirname, '.././dist/posts/markdown-posts');

        function parseFrontmatter(content) {
            const frontmatter = {};
            const frontmatterRegex = /---\s*\n([\s\S]*?)\n?---\s*\n([\s\S]*)/;

            if (content.match(frontmatterRegex)) {
                const [, frontmatterContent, postContent] = content.match(frontmatterRegex);
                const frontmatterLines = frontmatterContent.trim().split('\n');

                for (const line of frontmatterLines) {
                    const [key, value] = line.split(':').map(item => item.trim());
                    frontmatter[key] = value;
                }

                return { frontmatter, content: postContent.trim() };
            }

            return { frontmatter: {}, content };
        }

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            const markdownFiles = files.filter(file => file.endsWith('.md')).reverse();
            const postsData = {};

            markdownFiles.forEach(fileName => {
                const filePath = path.join(folderPath, fileName);
                const fileContent = fs.readFileSync(filePath, 'utf-8');

                const { frontmatter } = parseFrontmatter(fileContent);

                const { date, title, subtitle, category, frontCover, tag, update } = frontmatter;
                const updateValue = update !== undefined ? update : "";
                postsData[fileName] = { date, title, subtitle, category, frontCover, tag, update: updateValue };
            });

            const jsContent = fs.readFileSync(path.join(__dirname, '../src/settings', 'files.js'), 'utf-8');
            const jsonMatch = jsContent.match(/export default (\{[\s\S]*?\});/);

            if (jsonMatch && jsonMatch.length > 1) {
                const jsonContent = jsonMatch[1];
                const srcFilesObject = JSON.parse(jsonContent);

                // Now you can use srcFilesObject as your parsed JSON data
                console.log(srcFilesObject);
            } else {
                console.error('JSON data not found in the JavaScript module.');
            }


            if (updatedFilePath) {
                const filename = updatedFilePath.split('\\').pop();

                const today = new Date();
                const now = today.toLocaleString();

                if (postsData.hasOwnProperty(filename)) {
                    postsData[filename]['update'] = now;
                    console.log(`update ${filename}`)
                } else {
                    console.log(`File ${filename} not found in the files.js object.`);
                }
            }

            const fileContent = `export default ${JSON.stringify(postsData, null, 4)};`;


            fs.writeFile(path.join(__dirname, '../src/settings', 'files.js'), fileContent, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log('File list generated successfully!');
                    resolve();
                }
            });
        });
    }
    )
}

module.exports = generateFilesList;