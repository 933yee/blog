import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';

import { AiFillFolderOpen, AiTwotoneFolder, AiOutlineProfile } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import { VscExpandAll, VscCollapseAll } from "react-icons/vsc";
import './Categories.css';
import { CSSTransition } from 'react-transition-group';
import { updateFolderStates, expandFolderStates, collapseFolderStates } from 'states/actions.js';

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
                                            : <AiTwotoneFolder className="folder-icon"></AiTwotoneFolder>
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
    const { folderIsOpen, search } = props;
    const searchText = search.toLowerCase();
    const [shouldRender, setShouldRender] = useState(true);

    const getOrganizedData = () => {
        const organizedData = {};
        Object.keys(files).map(filename => {
            const entry = files[filename];
            const category = entry.category;
            const title = files[filename]['title'].toLowerCase()
            const splittedCategory = category.split(', ');
            if (title.toLowerCase().includes(searchText)) {
                buildCategory(organizedData, splittedCategory, 0, filename);
            } else {
                for (let cat of splittedCategory) {
                    if (cat.toLowerCase().includes(searchText)) {
                        buildCategory(organizedData, splittedCategory, 0, filename);
                        break;
                    }
                }
            }

        })
        function categoriesTraversal(obj) {
            let keys = []
            for (let key in obj) {
                if (key != "files") {
                    keys.push(key);
                    if (typeof obj[key] === 'object') {
                        keys = keys.concat(categoriesTraversal(obj[key]));
                    }
                }
            }
            return keys;
        }
        useEffect(() => {
            const initialDropdownStates = {};
            categoriesTraversal(organizedData).forEach(category => {
                initialDropdownStates[category] = false;
            });
            if (Object.keys(folderIsOpen).length === 0) {
                dispatch(updateFolderStates(initialDropdownStates));
            }
        }, []);
        return displayCategory(organizedData, 1, folderIsOpen, dispatch);
    }
    useEffect(() => {
        handleExpandButtonClick()
    }, [searchText])


    const handleExpandButtonClick = () => {
        dispatch(expandFolderStates())
        setShouldRender(!shouldRender);
    }
    const handleCollapseButtonClick = () => {
        dispatch(collapseFolderStates())
        setShouldRender(!shouldRender);
    }

    return (
        <div className='categories-container'>
            <div className='categories-content'>
                <span className='expand-button' onClick={handleExpandButtonClick}>
                    <VscExpandAll /> Expand
                </span>
                <span className='collapse-button' onClick={handleCollapseButtonClick}>
                    <VscCollapseAll /> Collapse
                </span>
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
