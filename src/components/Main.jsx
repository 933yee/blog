import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { AiFillHome, AiFillTags, AiOutlineSearch } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillArchiveFill, BsFillPersonFill } from "react-icons/bs";
import { FaFacebook, FaGithub, FaYoutube, FaEnvelope, FaSourcetree } from "react-icons/fa";

import Home from 'components/Home.jsx'
import Categories from 'components/Categories.jsx'
import Tags from 'components/Tags.jsx'
import './Main.css';


function Main() {
    const [inputSearchText, setinputSearchText] = useState('');
    const handleClickHomepage = () => {
        window.location.href = '/';
    };
    const handleInputSearchChange = (event) => {
        setinputSearchText(event.target.value);
    }

    return (
        <Router basename="/">
            <div className='main-container'>
                <div className='leftbar'>
                    <div className='introduce'>
                        {/* <div className='main-bg'> */}
                        <img
                            src='./image/avatar.png'
                            className='avatar'
                            onClick={handleClickHomepage}
                        ></img>
                        <div className='name' onClick={handleClickHomepage}>
                            Kevin's blog
                        </div>
                        {/* </div> */}

                        <div className='motto'>Espresso yourself.</div>
                    </div>

                    <div className='options'>
                        <Link to='/home' className='item'>
                            <div className='options-text'>
                                <AiFillHome className='options-icon'></AiFillHome>
                                home
                            </div>
                        </Link>
                        <Link to='/categories' className='item'>
                            <div className='options-text'>
                                <BiCategoryAlt className='options-icon'></BiCategoryAlt>
                                categories
                            </div>
                        </Link>
                        {/* <Link to='/tags' className='item'>
                            <div className='options-text'>
                                <AiFillTags className='options-icon'></AiFillTags>
                                tags
                            </div>
                        </Link> */}
                        <Link to='/archives' className='item'>
                            <div className='options-text'>
                                <BsFillArchiveFill className='options-icon'></BsFillArchiveFill>
                                archives
                            </div>
                        </Link>
                        <Link to='/about' className='item'>
                            <div className='options-text'>
                                <BsFillPersonFill className='options-icon'></BsFillPersonFill>
                                about
                            </div>
                        </Link>
                    </div>
                    <div className='contact'>
                        <a
                            href='https://www.facebook.com/profile.php?id=100003747192616'
                            className='contact-item'
                        >
                            <FaFacebook></FaFacebook>
                        </a>
                        <a href='https://github.com/933yee' className='contact-item'>
                            <FaGithub></FaGithub>
                        </a>
                        <a href='mailto:kevins30102@yahoo.com' className='contact-item'>
                            <FaEnvelope></FaEnvelope>
                        </a>
                        <a
                            href='https://www.youtube.com/channel/UCSbMujwFekgRcjlzJcKIj8g'
                            className='contact-item'
                        >
                            <FaYoutube></FaYoutube>
                        </a>
                        <a href='https://github.com/933yee/blog' className='contact-item'>
                            <FaSourcetree></FaSourcetree>
                        </a>
                    </div>
                </div>
                <div className='right'>
                    <div className='navbar'>Home</div>
                    <div style={{ display: 'flex', width: '100%', height: '92%' }}>
                        <div className='contents'>
                            {/* <div>
                            <ReactMarkdown remarkPlugins={[gfm]}>
                                {markdownContent}
                            </ReactMarkdown>
                        </div> */}
                            <Route path='/home' render={() =>
                                <div className='page'>
                                    <Home search={inputSearchText}></Home>
                                </div>}
                            />
                            <Route path='/categories' render={() =>
                                <div className='page'>
                                    <Categories search={inputSearchText}></Categories>
                                </div>}
                            />
                            {/* <Route path='/tags' render={() => <div className='page'><Tags></Tags></div>} /> */}
                            <Route path='/archives' render={() => <div>archives</div>} />
                            <Route path='/about' render={() => <div className='about-text'>{`¯\\_(ツ)_/¯`}</div>} />
                        </div>
                        <div className='rightbar'>
                            <div className='search'>
                                <div>
                                    <div className='search-text'>Search</div>
                                    <input
                                        type="text"
                                        className='search-input'
                                        placeholder='Type something...'
                                        value={inputSearchText}
                                        onChange={handleInputSearchChange}
                                    />
                                </div>
                                <div className='search-icon'>
                                    <AiOutlineSearch></AiOutlineSearch>
                                </div>
                            </div>
                            <div className='tags'>
                                Tags
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </Router >
    );
}

export default Main;
