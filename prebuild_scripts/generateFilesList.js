const fs = require('fs');
const path = require('path');
function generateFilesList() {
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

            const { date, title, subtitle, category, frontCover, tag } = frontmatter;
            postsData[fileName] = { date, title, subtitle, category, frontCover, tag };
        });

        const fileContent = `export default ${JSON.stringify(postsData, null, 4)};`;

        fs.writeFile(path.join(__dirname, '../src/settings', 'files.js'), fileContent, err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('File list generated successfully!');
        });
    });
}

module.exports = generateFilesList;