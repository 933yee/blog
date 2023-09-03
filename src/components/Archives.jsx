import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import './Archives.css';
const monthTable = {
    '01': 'Jan.', '02': 'Feb.', '03': 'Mar.', '04': 'Apr.', '05': 'May', '06': 'Jun.', '07': 'Jul.', '08': 'Aug.', '09': 'Sep.', '10': 'Oct.', '11': 'Nov.', '12': 'Dec.'
};
function Archives() {
    const urlOrigin = window.location.origin;
    const [postData, setPostData] = useState({});
    useEffect(() => {
        const postDataTmp = {};
        Object.keys(files).map((filename, index) => {
            const title = files[filename].title;
            const date = files[filename].date
            const splittedDate = date.split('-');
            const year = splittedDate[0];
            const month = monthTable[splittedDate[1]];
            const day = splittedDate[2];
            if (!postDataTmp[year]) {
                postDataTmp[year] = []
            }
            postDataTmp[year].push(
                {
                    'title': title,
                    'month': month,
                    'day': day,
                    'filename': filename,
                }
            )
        })
        setPostData(postDataTmp)
    }, [])

    const handlePostOnClick = (filename) => {
        window.location.href = `${urlOrigin}/#/home/posts/${filename}`;
    }

    const getContents = () => {
        const years = Object.keys(postData).reverse();

        return years.map((year, index) => {
            return (
                <div key={index}>
                    <div className='year'>
                        {year}
                    </div>
                    {
                        postData[year].map((post, postIndex) => {
                            return (
                                <div key={postIndex} className='post'>
                                    <div className='day'>
                                        {post['day']}
                                    </div>
                                    <div className='month'>
                                        {post['month']}
                                    </div>
                                    <div className='title' onClick={() => handlePostOnClick(post['filename'])}>
                                        {post['title']}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    }


    return (
        <div className='archives-container'>
            <div className='content'>
                {getContents()}
            </div>
        </div>
    )
}

export default Archives;
