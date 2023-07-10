import React, { useState, useEffect } from 'react';
import Post from 'components/Post.jsx';
import files from 'settings/files.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState();
    // <div className='post-grid' key={index} onClick={() => handleClick(index)}>
    // </div>
    useEffect(() => {
        setPosts(
            files.map((fileName, index) => (
                <Link to={`/home/posts/${fileName}`} className='post-grid' key={index}>
                    <div className='post'>
                        <Post fileName={fileName} />
                    </div>
                </Link>
            ))
        );
        setPage(
            files.map((fileName, index) => (
                <Route key={index} exact path={`/home/posts/${fileName}`}
                    render={() => <Post fileName={fileName} index={index} />} />
            ))
        );
    }, []);
    return (
        <div className='home-container' style={{ height: '100%', width: '100%' }}>
            <Route exact path='/home' render={() => <div className='home-container'>{posts}</div>} />
            {page}
        </div>
    )
}


export default Home;
