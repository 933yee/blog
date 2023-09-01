import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import './tags.css';

function Tags() {
    const getOrganizedData = () => {
        const organizedData = {};
        Object.keys(files).map(filename => {
            const entry = files[filename];
            const category = entry.category;
            buildCategory(organizedData, category.split(', '), 0, filename);
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
    return (
        <div className='tags-container'>

        </div>
    )
}

export default Tags;
