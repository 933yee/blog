import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillFolderOpen } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { local } from './settings.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import ReactPlayer from 'react-player';
import './Post.css';

// local or github page side
const postsBaseUrl = local
    ? 'http://localhost:7070/posts/markdown-posts/'
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/markdown-posts/';
const imagesBaseUrl = local
    ? 'http://localhost:7070/posts/front-cover/'
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/front-cover/';

const defaultImagePath = `${imagesBaseUrl}default-image.png`;

function Post(props) {
    const [markdownContent, setMarkdownContent] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imagePath, setImagePath] = useState('');
    const index = props.index;

    useEffect(() => {
        // Fetch the Markdown content from the file
        fetch(`${postsBaseUrl}${props.fileName}`)
            .then((response) => response.text())
            .then((content) => {
                // Extract metadata
                const { metadata, remainingContent } = extractMetadata(content);
                if (metadata) {
                    const { date, title, subtitle, category, frontCover } = metadata;
                    // check whether frontCover is in md file and set the front cover of the post
                    if (frontCover === undefined) {
                        getImagePath().then((finalImagePath) => {
                            setImagePath(finalImagePath);
                        });
                    } else {
                        setImagePath(`${imagesBaseUrl}${frontCover}`);
                    }

                    setDate(date);
                    setTitle(title);
                    setSubTitle(subtitle);
                    setCategory(category);
                }

                // Set the Markdown content
                setMarkdownContent(remainingContent);
            });
    }, []);

    function extractMetadata(markdownContent) {
        const metadataRegex = /^---\s*\n([\s\S]+?)\n?---/;
        const metadataMatch = markdownContent.match(metadataRegex);
        if (metadataMatch && metadataMatch[1]) {
            const metadataLines = metadataMatch[1].trim().split('\n');
            const metadata = {};
            for (const line of metadataLines) {
                const [key, value] = line.split(':').map((item) => item.trim());
                metadata[key] = value;
            }
            const remainingContent = markdownContent.substring(metadataMatch[0].length);
            return { metadata, remainingContent };
        }
        return null;
    }

    // check whether the post image exists
    function checkImageExists(imageUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function () {
                resolve(true);
            };
            img.onerror = function () {
                resolve(false);
            };
            img.src = imageUrl;
        });
    }

    // get the path of the post image
    async function getImagePath() {
        const imagePath = `${imagesBaseUrl}${props.fileName.split('.')[0]}.png`;
        const imageExists = await checkImageExists(imagePath);
        if (imageExists) {
            return imagePath;
        } else {
            return defaultImagePath;
        }
    }

    // syntax highlighter
    const renderers = {
        code: ({ node, inline, className, children, ...props }) => {
            const language = className ? className.replace('language-', '') : '';
            const value = children[0] || '';

            if (language === 'youtube') { // 處理YouTube影片
                return <div className="post-video" ><ReactPlayer url={value} controls /></div>;
            } else {
                return (
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {value}
                    </SyntaxHighlighter>
                );
            }
        },
    };

    return (
        index === undefined ? (
            <div className="post-container">
                <div className="post-img-container">
                    <img
                        src={imagePath}
                        alt={`${props.fileName.split('.')[0]}.png`}
                        className="post-img"
                    />
                    <div className="color-bar"></div>
                </div>
                <div className="post-content">
                    <div className="post-title">{title}</div>
                    <div className="post-subtitle">{subtitle}</div>
                    <div className="post-information">
                        <div className="post-date">
                            <MdDateRange className="date-icon"></MdDateRange>
                            {date}
                        </div>
                        <div className="post-category">
                            <AiFillFolderOpen className="category-icon"></AiFillFolderOpen>
                            {category}
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="post-file-content">
                <ReactMarkdown
                    remarkPlugins={[gfm]}
                    components={renderers}
                    children={markdownContent}
                    rehypePlugins={[rehypeRaw]} // Add rehypeRaw plugin to render HTML tags
                />
            </div>
        )
    );
}

export default Post;
