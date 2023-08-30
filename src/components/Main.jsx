import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { AiFillHome, AiFillTags } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi"; BsFillArchiveFill
import { BsFillArchiveFill, BsFillPersonFill } from "react-icons/bs";
import Home from 'components/Home.jsx'
import Categories from 'components/Categories.jsx'

import './Main.css';


function Main() {
    const handleClickHomepage = () => {
        window.location.href = '/';
    };


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
                        <Link to='/tags' className='item'>
                            <div className='options-text'>
                                <AiFillTags className='options-icon'></AiFillTags>
                                tags
                            </div>
                        </Link>
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
                            <i className='fa-brands fa-facebook'></i>
                        </a>
                        <a href='https://github.com/933yee' className='contact-item'>
                            <i className='fa-brands fa-github'></i>
                        </a>
                        <a href='mailto:kevins30102@yahoo.com' className='contact-item'>
                            <i className='fa-solid fa-envelope'></i>
                        </a>
                        <a
                            href='https://www.youtube.com/channel/UCSbMujwFekgRcjlzJcKIj8g'
                            className='contact-item'
                        >
                            <i className='fa-brands fa-youtube'></i>
                        </a>
                        <a href='https://github.com/933yee/blog' className='contact-item'>
                            <i className='fa-brands fa-sourcetree'></i>
                        </a>
                    </div>
                </div>
                <div className='right'>
                    <div className='navbar'>Home</div>
                    <div className='contents'>
                        {/* <div>
                            <ReactMarkdown remarkPlugins={[gfm]}>
                                {markdownContent}
                            </ReactMarkdown>
                        </div> */}
                        <Route path='/home' render={() => <div className='page'><Home></Home></div>} />
                        <Route path='/categories' render={() => <div className='page'><Categories></Categories></div>} />
                        <Route path='/tags' render={() => <div>tags</div>} />
                        <Route path='/archives' render={() => <div>archives</div>} />
                        <Route path='/about' render={() => <div className='about-text'>{`¯\\_(ツ)_/¯`}</div>} />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Main;
