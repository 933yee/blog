import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { AiFillFolderOpen, AiOutlineFolder, AiOutlineProfile } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import { CiSignpostR1 } from "react-icons/ci";

import './Categories.css';
import { CSSTransition } from 'react-transition-group';
import { updateFolderStates } from 'states/actions.js';
import { connect, useDispatch } from 'react-redux';
const urlOrigin = window.location.origin;

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



function displayCategory(organizedData, layer, folderIsOpen, dispatch) {

    const handleCategoryFolderDropdwonButtonClick = (item) => {
        dispatch(updateFolderStates({
            ...folderIsOpen,
            [item]: !folderIsOpen[item]
        }))
    }
    if (Array.isArray(organizedData)) { // is file
        return (
            <div>
                {organizedData.map((filename, index) => (
                    <div key={index}>
                        <a href={`${urlOrigin}/#/home/posts/${filename}`} className='filename'>

                            <AiOutlineProfile style={{ marginRight: '0.5rem', color: 'white' }}></AiOutlineProfile>
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
                                    {displayCategory(organizedData[item], layer + 1, folderIsOpen, dispatch)}
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className={`category-layer category-layer${layer}`}>
                                    <span onClick={() => handleCategoryFolderDropdwonButtonClick(item)} className='category-text'>
                                        {folderIsOpen[item]
                                            ? <AiFillFolderOpen className="folder-icon"></AiFillFolderOpen>
                                            : <AiOutlineFolder className="folder-icon"></AiOutlineFolder>
                                        }
                                        {item}
                                        <SlArrowRight className={`folder-state-icon ${folderIsOpen[item] ? 'rotated' : ''}`}></SlArrowRight>
                                    </span>
                                    <CSSTransition
                                        in={folderIsOpen[item]}
                                        timeout={300}
                                        classNames="fade"
                                        unmountOnExit
                                    >
                                        <div className='category-indent'>
                                            {displayCategory(organizedData[item], layer + 1, folderIsOpen, dispatch)}
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

function Categories(props) {
    const dispatch = useDispatch();
    const { folderIsOpen } = props;
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
            if (Object.keys(folderIsOpen).length === 0) {
                dispatch(updateFolderStates(initialDropdownStates));
            }
        }, []);
        return displayCategory(organizedData, 1, folderIsOpen, dispatch);
    }
    return (
        <div className='categories-container'>
            <div className='categories-content'>
                {getOrganizedData()}
            </div>
        </div>
    )
}

export default connect((state) => {
    return {
        ...state.folderStates
    }
})(Categories);
