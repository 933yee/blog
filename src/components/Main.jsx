import React, { useState, useRef } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input
} from 'reactstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Main.css';

function Main() {
    // window.location.href = '/';

    const handleClickHomepage = () => {
        window.location.href = '/blog';
    }

    return (
        <div className='main'>
            <div className='leftbar'>
                <div className='introduce'>
                    <img src='./image/avatar.png' className='avatar'
                        onClick={handleClickHomepage}>
                    </img>
                    <div className='name'
                        onClick={handleClickHomepage}>
                        Kevin's blog
                    </div>
                    <div className='motto'>
                        sip, code, espresso yourself.
                    </div>
                </div>
                <Router>
                    <div className='options'>
                        <Link to="/blog" className='item'>
                            home
                        </Link>
                        <Link to="/categories" className='item'>
                            categories
                        </Link>
                        <Link to="/tags" className='item'>
                            tags
                        </Link>
                        <Link to="/archives" className='item'>
                            archives
                        </Link>
                        <Link to="/about" className='item'>
                            about
                        </Link>
                    </div>
                </Router>
                <div className='contact'>
                    <a href='https://www.facebook.com/profile.php?id=100003747192616' className='contact-item'>
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href='https://github.com/933yee' className='contact-item'>
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href='mailto:kevins30102@yahoo.com' className='contact-item'>
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a href='https://www.youtube.com/channel/UCSbMujwFekgRcjlzJcKIj8g' className='contact-item'>
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href='https://github.com/933yee/blog' className='contact-item'>
                        <i className="fa-brands fa-sourcetree"></i>
                    </a>
                </div>
            </div>
            <div className='right'>
                <div className='navbar'>
                    yee
                </div>
                <div className='contents'>

                </div>
            </div>
        </div>
    );
};

export default Main;