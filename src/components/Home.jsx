import React, { useState, useEffect } from 'react';

import Post from 'components/Post.jsx';
import { files } from './settings.js';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(
            files.map((fileName, index) => (
                <div className='post-grid' key={index} onClick={() => handleClick(index)}>
                    <div className='post'>
                        <Post fileName={fileName} />
                    </div>
                </div>
            ))
        );
    }, []);

    const handleClick = (index) => {
        console.log(index);
    };

    return <div className='home-container'>{posts}</div>;
}


export default Home;
