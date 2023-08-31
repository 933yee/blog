import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { AiFillFolderOpen, AiOutlineFolder } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import './Categories.css';
import { CSSTransition } from 'react-transition-group';

function buildCategory(organizedData, categoryList, index, filename) {
    if (categoryList.length == index + 1) {
        if (!organizedData[categoryList[index]]) {
            organizedData[categoryList[index]] = { 'files': [] }
        }
        organizedData[categoryList[index]]['files'].push(filename);
    } else {
        if (!organizedData[categoryList[index]]) {
            organizedData[categoryList[index]] = { 'files': [] };
        }
        buildCategory(organizedData[categoryList[index]], categoryList, index + 1, filename);
    }

}



function displayCategory(organizedData, layer, dropdownButtonStates, setDropdownButtonStates) {
    const url = window.location.origin;
    const handleCategoryFolderDropdwonButtonClick = (item) => {
        setDropdownButtonStates(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    }
    if (Array.isArray(organizedData)) { // is file
        return (
            <div className='filenames'>
                {organizedData.map((filename, index) => (
                    <div key={index}>
                        <a href={`${url}/#/home/posts/${filename}`}>
                            {files[filename]['title']}
                        </a>
                    </div>
                ))
                }
            </div >
        )
    } else {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                {
                    Object.keys(organizedData).map((item, index) => {
                        if (item == 'files') {
                            return (
                                <div key={index}>
                                    {displayCategory(organizedData[item], layer + 1, dropdownButtonStates, setDropdownButtonStates)}
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className={`category-layer category-layer${layer}`}>
                                    <span onClick={() => handleCategoryFolderDropdwonButtonClick(item)} className='category-text'>
                                        {dropdownButtonStates[item]
                                            ? <AiFillFolderOpen className="folder-icon"></AiFillFolderOpen>
                                            : <AiOutlineFolder className="folder-icon"></AiOutlineFolder>
                                        }
                                        {item}
                                        <SlArrowRight className={`folder-state-icon ${dropdownButtonStates[item] ? 'rotated' : ''}`}></SlArrowRight>
                                    </span>
                                    <CSSTransition
                                        in={dropdownButtonStates[item]}
                                        timeout={300}
                                        classNames="fade"
                                        unmountOnExit
                                    >
                                        <div className='category-indent'>
                                            {displayCategory(organizedData[item], layer + 1, dropdownButtonStates, setDropdownButtonStates)}
                                        </div>
                                    </CSSTransition>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

function Categories() {
    const [dropdownButtonStates, setDropdownButtonStates] = useState({});
    const getOrganizedData = () => {
        const organizedData = {};
        Object.keys(files).map(filename => {
            const entry = files[filename];
            const category = entry.category;
            buildCategory(organizedData, category.split(', '), 0, filename);
        })
        useEffect(() => {
            const initialDropdownStates = {};
            Object.keys(organizedData).forEach(category => {
                initialDropdownStates[category] = false;
            });
            setDropdownButtonStates(initialDropdownStates);
        }, []);
        // console.log(organizedData)

        // console.log(displayCategory(organizedData, 0))
        return displayCategory(organizedData, 1, dropdownButtonStates, setDropdownButtonStates);
    }
    return (
        <div className='categories-container'>
            <div className='categories-content'>
                {getOrganizedData()}
            </div>
        </div>
    )
}

export default Categories;
