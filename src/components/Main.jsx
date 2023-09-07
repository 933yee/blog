import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    useHistory
} from 'react-router-dom';

import { AiFillHome, AiFillTags, AiOutlineSearch, AiOutlineBars } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillArchiveFill, BsFillPersonFill, BsBug } from "react-icons/bs";
import { FaFacebook, FaGithub, FaYoutube, FaEnvelope, FaSourcetree } from "react-icons/fa";
import { FaRegCaretSquareLeft } from "react-icons/fa"

import Home from 'components/Home.jsx'
import Categories from 'components/Categories.jsx'
import Tags from 'components/Tags.jsx'
import TagPage from 'components/TagPage.jsx'
import Archives from 'components/Archives.jsx'
import './Main.css';


function Main() {
    const [inputSearchText, setinputSearchText] = useState('');
    const [hideLeftBar, setHideLeftBar] = useState(false); // the hide button on the top

    const handleClickHomepage = () => {
        window.location.href = '/#';
    };
    const handleInputSearchChange = (event) => {
        setinputSearchText(event.target.value);
    }

    const handleHideButtonOnClick = () => {
        setHideLeftBar(!hideLeftBar);
    }

    const getLeftBar = () => {
        return (
            <div className={`leftbar ${hideLeftBar ? 'hide' : ''}`}>
                <div className={`introduce ${hideLeftBar ? 'hide' : ''}`}>
                    <img
                        src='./image/avatar.png'
                        className='avatar'
                        onClick={handleClickHomepage}
                    ></img>
                    <div className='name' onClick={handleClickHomepage}>
                        Kevin's blog
                    </div>
                    <div className='motto'>
                        I'm a bug creator <BsBug style={{ marginLeft: '0.5rem' }}></BsBug>
                    </div>
                </div>

                <div className={`options ${hideLeftBar ? 'hide' : ''}`}>
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
                    <Link to='/tags/display' className='item tag-page'>
                        <div className='options-text'>
                            <AiFillTags className='options-icon'></AiFillTags>
                            tags
                        </div>
                    </Link>
                    <Link to='/about' className='item'>
                        <div className='options-text'>
                            <BsFillPersonFill className='options-icon'></BsFillPersonFill>
                            about
                        </div>
                    </Link>
                </div>
                <div className={`contact ${hideLeftBar ? 'hide' : ''}`}>
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
        )
    }

    const getRightContent = () => {
        return (
            <div className={`right ${hideLeftBar ? 'hide' : ''}`}>
                <div className='navbar'>
                    <div className={`hide-button`}>
                        <AiOutlineBars
                            className={`hide-button-text ${hideLeftBar ? 'hide' : ''}`}
                            onClick={handleHideButtonOnClick}
                        />
                    </div>
                    <div className={`search ${hideLeftBar ? '' : 'hide'}`}>
                        <div >
                            {/* <div className='search-text'>Search</div> */}
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
                </div>
                <div style={{ display: 'flex', width: '100%', height: '92%' }}>
                    <div className='contents'>
                        {/* <div>
                            <ReactMarkdown remarkPlugins={[gfm]}>
                                {markdownContent}
                            </ReactMarkdown>
                        </div> */}
                        <Route path='/' exact render={() =>
                            <div className='page'>
                                yee
                            </div>}
                        />
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
                        <Route path='/tags' render={() =>
                            <div className='page'>
                                <TagPage></TagPage>
                            </div>}
                        />
                        <Route path='/archives' render={() =>
                            <div className='page'>
                                <Archives></Archives>
                            </div>}
                        />
                        <Route path='/about' render={() => <div className='about-text'>{`¯\\_(ツ)_/¯`}</div>} />
                    </div>
                    <div className={`rightbar`}>
                        <div className='tags'>
                            <AiFillTags style={{ marginRight: "5px" }}></AiFillTags>Tags
                            <Tags></Tags>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    return (
        <Router basename="/">
            <div className='main-container'>
                {getLeftBar()}
                {getRightContent()}
            </div >
        </Router >
    );
}

export default Main;
