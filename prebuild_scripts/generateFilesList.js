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
                    const splittedLines = line.split(':');
                    const key = splittedLines[0].trim();
                    const value = splittedLines.slice(1).join(':').trim();
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

            const jsonContent = jsonMatch[1];
            const srcFilesObject = JSON.parse(jsonContent);
            Object.keys(postsData).map((fileName) => {
                if (srcFilesObject.hasOwnProperty(fileName))
                    postsData[fileName]['update'] = srcFilesObject[fileName]['update'];
            });

            if (updatedFilePath) {
                const fileName = updatedFilePath.split('\\').pop();

                const today = new Date();
                const now = today.toLocaleString();

                if (postsData.hasOwnProperty(fileName)) {
                    postsData[fileName]['update'] = now;
                    console.log(`update ${fileName}`)
                } else {
                    console.log(`File ${fileName} not found in the files.js object.`);
                }
            }

            // 排序，最近更新的最上面
            const keys = Object.keys(postsData);
            keys.sort((a, b) => {
                const updateTimeA = new Date(postsData[a].update);
                const updateTimeB = new Date(postsData[b].update);
                return updateTimeB - updateTimeA;
            });
            const sortedPostsData = {};
            keys.forEach(key => {
                sortedPostsData[key] = postsData[key];
            });


            const fileContent = `export default ${JSON.stringify(sortedPostsData, null, 4)};`;
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