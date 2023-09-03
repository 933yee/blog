import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import './Tags.css';

function Tags() {
    const [tagsList, setTagsList] = useState([]);
    const [postNumber, setPostNumber] = useState({});
    const urlOrigin = window.location.origin;
    useEffect(() => {
        const tagsSet = new Set();
        const postNumberTmp = {};
        Object.keys(files).forEach(filename => {
            const entry = files[filename];
            const tags = entry.tag;
            const splittedTag = tags.split(', ');
            splittedTag.forEach(tag => {
                tagsSet.add(tag);
                if (!postNumberTmp[tag])
                    postNumberTmp[tag] = 1;
                else
                    postNumberTmp[tag]++;
            });
        });
        const uniqueTags = Array.from(tagsSet);
        setTagsList(uniqueTags);
        setPostNumber(postNumberTmp);
    }, []);

    const handleTagOnClick = (tag) => {
        window.location.href = `${urlOrigin}/#/tags/${tag}`;
    }

    const displayTags = () => {
        return (tagsList).map((tag, index) => {
            return (
                <span className='tag' key={index} onClick={() => handleTagOnClick(tag)}>
                    {`${tag}`}
                    <span className='post-number'>
                        {postNumber[tag]}
                    </span>
                </span>
            );
        })
    }

    return (
        <div className='tags-container'>
            {displayTags()}
        </div>
    )
}

export default Tags;
