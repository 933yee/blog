import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { AiFillFolderOpen, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiRightArrow, BiShowAlt } from 'react-icons/bi'
import { MdDateRange } from 'react-icons/md';
import rehypeRaw from 'rehype-raw';
import ReactPlayer from 'react-player';
import './Post.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, twilight, nightOwl, oneDark, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
const codeStyle = tomorrow;
const Latex = require('react-latex');
// local or github page side
const urlHostname = window.location.hostname;
const urlOrigin = window.location.origin;
const monthTable = {
    '01': 'Jan.', '02': 'Feb.', '03': 'Mar.', '04': 'Apr.', '05': 'May', '06': 'Jun.', '07': 'Jul.', '08': 'Aug.', '09': 'Sep.', '10': 'Oct.', '11': 'Nov.', '12': 'Dec.'
};

const postImagesBaseUrl = (urlHostname == "localhost")
    ? `${urlOrigin}/posts/post-images/`
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/post-images/';
const postsBaseUrl = (urlHostname == "localhost")
    ? `${urlOrigin}/posts/markdown-posts/`
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/markdown-posts/';
const frontCoverBaseUrl = (urlHostname == "localhost")
    ? `${urlOrigin}/posts/front-cover/`
    : 'https://raw.githubusercontent.com/933yee/933yee.github.io/gh-pages/posts/front-cover/';

const defaultImagePath = `${frontCoverBaseUrl}default-image.png`;

function Post(props) {
    const [markdownContent, setMarkdownContent] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [wordDetailsVisibility, setWordDetailsVisibility] = useState({});
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
                        if (index === undefined)
                            checkImageExists(frontCover).then(res => {
                                if (res) {
                                    setImagePath(frontCover);
                                } else {
                                    const storedImage = `${frontCoverBaseUrl}${frontCover}`;
                                    checkImageExists(storedImage).then(res => {
                                        if (res) {
                                            setImagePath(storedImage);
                                        } else {
                                            setImagePath(defaultImagePath);
                                        }
                                    })
                                }
                            });

                        const splittedDate = date.split('-');
                        const year = splittedDate[0];
                        const month = splittedDate[1];
                        const day = splittedDate[2];
                        setDate(`${monthTable[month]} ${day}, ${year}`);
                        setTitle(title);
                        setSubTitle(subtitle);
                        setCategory(category.split(', ')[0]);
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
                const splittedLine = line.split(':');
                const key = splittedLine[0];
                const value = splittedLine.slice(1).join(':').trim();
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

    const handleVocabularyClicked = (word) => {
        setWordDetailsVisibility((prevState) => ({
            ...prevState,
            [word]: !prevState[word],
        }));
    }

    // syntax highlighter
    const renderers = {
        pre({ node, ...props }) {
            try {
                const language = props.children[0].props.className.replace('language-', '');
                if (language === 'vocabulary') {
                    return <>{props.children}</>;
                } else {
                    return <pre {...props} />;
                }
            } catch {
                return <pre {...props} />;
            }

        },
        code: ({ node, inline, className, children }) => {
            const language = className ? className.replace('language-', '') : '';
            const value = children[0] || '';
            if (language === 'vocabulary') {
                const lines = value.split('\n');
                const unindentedLines = lines.map((line) => line.replace(/^\s{4}/, ''));
                const unindentedValue = unindentedLines.slice(1).join('\n');
                const word = unindentedLines[0].replace('- #### ', '');
                return (
                    <ul>
                        <h4>
                            <div style={{
                                fontSize: '1rem',
                                color: 'white'
                            }}
                                className='btn btn-outline-dark btn-sm'
                                onClick={() => handleVocabularyClicked(word)}>
                                {wordDetailsVisibility[word] ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                            {` ${word}`}
                        </h4>
                        <div style={{ display: wordDetailsVisibility[word] ? 'block' : 'none' }}>
                            <ReactMarkdown
                                remarkPlugins={[gfm]}
                                rehypePlugins={[[rehypeRaw]]}
                                components={renderers}
                                children={unindentedValue}
                            />
                        </div>
                    </ul>
                );
            } else if (language === 'youtube') { // 處理YouTube影片
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }} ><ReactPlayer url={value} controls /></div>
                );
            } else if (language === 'def' || language === 'definition') {
                return (
                    <div style={{ display: "flex", color: "rgb(255, 255, 255, 0.6)", paddingLeft: "0.5rem", whiteSpace: "pre-wrap" }}>
                        »<div style={{ paddingLeft: "0.5rem" }}>{value}</div>
                    </div >
                );
            } else if (language === 'quote') {
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
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '70%',
                            height: '70%',
                            margin: 'auto',
                            display: 'block'
                        }}
                    ></img>
                );
            } else if (language === 'latex') {
                return (
                    <div style={{ color: 'rgb(255, 255, 128, 0.8)', overflow: 'hidden', whiteSpace: "pre-wrap" }}>
                        <Latex>{`$${value}$`}</Latex>
                    </div>
                );
            } else {
                const newValue = value.slice(0, -1);
                return (
                    <SyntaxHighlighter
                        language={language}
                        style={codeStyle}
                        showLineNumbers='True'
                        // wrapLongLines='True'
                        wrapLines='True'
                        className="code-syntax"
                        customStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        {newValue}
                    </SyntaxHighlighter>
                );
            }
        },
    };


    const getPostContents = () => {
        // console.log(markdownContent)
        if (index === undefined) {
            return (
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
            )
        } else {
            return (
                <div className="post-file-content">
                    <div className='post-data'>
                        {title}
                    </div>
                    <ReactMarkdown
                        remarkPlugins={[gfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={renderers}
                        children={markdownContent}
                    />
                </div >
            )
        }
    }


    return (
        getPostContents()
    )
}

export default Post;
