import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillFolderOpen } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { local } from './settings.js';
import rehypeRaw from 'rehype-raw';
import ReactPlayer from 'react-player';
import './Post.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
const codeStyle = dracula;

// local or github page side
const postImagesBaseUrl = local
    ? 'http://localhost:7070/posts/post-images/'
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/post-images/';
const postsBaseUrl = local
    ? 'http://localhost:7070/posts/markdown-posts/'
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/markdown-posts/';
const frontCoverBaseUrl = local
    ? 'http://localhost:7070/posts/front-cover/'
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/front-cover/';

const defaultImagePath = `${frontCoverBaseUrl}default-image.png`;

function Post(props) {
    const [markdownContent, setMarkdownContent] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imagePath, setImagePath] = useState('');
    const index = props.index;

    useEffect(() => {
        async function fetchData() {
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
                            setImagePath(`${frontCoverBaseUrl}${frontCover}`);
                        }

                        setDate(date);
                        setTitle(title);
                        setSubTitle(subtitle);
                        setCategory(category);
                    }

                    // Set the Markdown content
                    setMarkdownContent(remainingContent);
                });
        }
        fetchData();
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
        const imagePath = `${frontCoverBaseUrl}${props.fileName.split('.')[0]}.png`;
        const imageExists = await checkImageExists(imagePath);
        if (imageExists) {
            return imagePath;
        } else {
            return defaultImagePath;
        }
    }

    // syntax highlighter
    const renderers = {
        code: ({ node, inline, className, children }) => {
            const language = className ? className.replace('language-', '') : '';
            const value = children[0] || '';

            if (language === 'youtube') { // 處理YouTube影片
                return (
                    <div className="post-video" ><ReactPlayer url={value} controls /></div>
                );
            } else if (language === 'def') {
                return (
                    <div style={{ display: "flex", color: "rgb(0, 255, 128, 0.8)", paddingLeft: "0.5rem", whiteSpace: "pre-wrap" }}>
                        »<div style={{ paddingLeft: "0.5rem" }}>{value}</div>
                    </div >
                );
            } else if (language === 'citation') {
                return (
                    <div style={{ paddingLeft: "1em", borderLeft: "4px solid rgb(255, 255, 255, 0.2)", color: "rgb(255, 255, 255, 0.5)", whiteSpace: "pre-wrap" }}>
                        {value}
                    </div>
                );
            } else if (language === 'img') {
                const folderName = props.fileName.split('.')[0] + '/';
                return (
                    <img
                        src={`${postImagesBaseUrl}${folderName}${value}`}
                        style={{ objectFit: 'cover', objectPosition: 'center', width: '70%', height: '70%' }}
                    ></img>
                );
            } else {
                return (
                    <SyntaxHighlighter language={language} style={codeStyle}>
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
                    rehypePlugins={[rehypeRaw]} // Add rehypeKatex and rehypeRaw plugins
                    components={renderers}
                    children={markdownContent}
                />
            </div>
        )
    );
}

export default Post;
