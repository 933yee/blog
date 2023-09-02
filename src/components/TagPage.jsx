import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import './TagPage.css';

import { AiOutlineProfile } from "react-icons/ai";
import { CgTag } from "react-icons/cg"

function TagPage() {
    const [filenames, setFilenames] = useState([]);
    const targetTag = window.location.hash.split('/')[2];
    const urlOrigin = window.location.origin;
    useEffect(() => {
        const filenamesTmp = [];
        Object.keys(files).map(filename => {
            const tags = files[filename]['tag'];
            const splittedTags = tags.split(', ');
            for (let postTag of splittedTags) {
                if (postTag == targetTag) {
                    filenamesTmp.push(filename);
                    break;
                }
            }
        });
        setFilenames(filenamesTmp);
    }, [targetTag]);

    const handlePostOnClick = (filename) => {
        window.location.href = `${urlOrigin}/#/home/posts/${filename}`;
    }

    return (
        <div className='tag-page-container'>
            <div className='datas'>
                <div className='target-tag'>
                    <CgTag style={{ marginRight: '0.5rem' }}></CgTag>
                    {targetTag}
                    <div className='post-number'>
                        {`${filenames.length} Post${filenames.length == 1 ? '' : 's'}`}
                    </div>
                </div>

                {filenames.map((filename, index) => (
                    <div className='filedata-container' key={index} onClick={() => handlePostOnClick(filename)}>
                        <div className='title' >
                            <AiOutlineProfile style={{ marginRight: '0.5rem', color: 'white' }}></AiOutlineProfile>
                            {files[filename]['title']}
                        </div>
                        <div className='date'>
                            {files[filename]['date']}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TagPage;
