import React, { useState, useEffect } from 'react';
import Post from 'components/Post.jsx';
import files from 'settings/files.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './Home.css';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

function Home(props) {
    const searchText = props.search;
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState([]);
    const [paginationCount, setPaginationCount] = useState()
    const [currentPagination, setCurrentPagination] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const perpageSize = 7;
    const firstPost = (currentPage - 1) * perpageSize;
    const lastPost = currentPage * perpageSize;
    const paginationButtonDisplayCount = 5;

    useEffect(() => {
        setCurrentPage(1);

        const nextPosts = (
            Object.keys(files).map((fileName, index) => {
                const title = files[fileName]['title'].toLowerCase();
                const subtitle = files[fileName]['subtitle'].toLowerCase();
                if (title.includes(searchText.toLowerCase()) || subtitle.includes(searchText.toLowerCase())) {
                    return (
                        <div className='post-grid-outer' key={index}>
                            <Link to={`/home/posts/${fileName}`} className='post-grid' >
                                <div className='post'>
                                    <Post fileName={fileName} />
                                </div>
                            </Link>
                        </div>
                    )
                }
                return null;
            }
            )
        ).filter(item => item !== null);
        setPosts(nextPosts);
        setPage(
            Object.keys(files).map((fileName, index) => (
                <Route key={index} exact path={`/home/posts/${fileName}`}
                    render={() => <Post fileName={fileName} index={index} />} />
            ))
        );
        setPaginationCount(Math.ceil(nextPosts.length / perpageSize))
    }, [searchText]);

    useEffect(() => {
        setCurrentPagination(getCurrentPagination());
    }, [currentPage, paginationCount]);

    const handlePageChange = (index) => {
        setCurrentPage(index)
    }

    function getCurrentPagination() {
        let pagination = [];
        const halfOfPaginationButtonDisplayCount = Math.floor(paginationButtonDisplayCount / 2);
        pagination.push(
            <div
                className={`pagination-button`}
                key={0}
                onClick={() => handlePageChange(1)
                }>
                <MdKeyboardDoubleArrowLeft></MdKeyboardDoubleArrowLeft>
            </div>)
        if (currentPage <= halfOfPaginationButtonDisplayCount) {
            for (let i = 1; i <= paginationCount && i <= paginationButtonDisplayCount; i++) {
                pagination.push(
                    <div
                        className={`pagination-button ${i == currentPage ? 'active' : ''}`}
                        key={i}
                        onClick={() => handlePageChange(i)
                        }>
                        {i}
                    </div>)
            }
        } else if (currentPage >= paginationCount - halfOfPaginationButtonDisplayCount + 1) {
            for (let i = Math.max(paginationCount - paginationButtonDisplayCount + 1, 1); i <= paginationCount; i++) {
                pagination.push(
                    <div
                        className={`pagination-button ${i == currentPage ? 'active' : ''}`}
                        key={i}
                        onClick={() => handlePageChange(i)
                        }>
                        {i}
                    </div>)
            }
        } else {
            for (let i = currentPage - halfOfPaginationButtonDisplayCount; i <= currentPage + halfOfPaginationButtonDisplayCount; i++) {
                pagination.push(
                    <div
                        className={`pagination-button ${i == currentPage ? 'active' : ''}`}
                        key={i}
                        onClick={() => handlePageChange(i)
                        }>
                        {i}
                    </div>)
            }
        }

        pagination.push(
            <div
                className={`pagination-button`}
                key={paginationCount + 1}
                onClick={() => handlePageChange(paginationCount)
                }>
                <MdKeyboardDoubleArrowRight></MdKeyboardDoubleArrowRight>
            </div>)
        return pagination;
    }

    return (
        <div className='home-container'>
            <Route exact path='/home' render={() =>
                <div style={{ height: '100%', width: '100%' }}>
                    <div className='posts'>
                        {posts.slice(firstPost, lastPost)}
                    </div>
                    <div className='pagination'>
                        {currentPagination}
                    </div>
                </div>
            } />
            {page}
        </div>
    )
}

export default Home;
