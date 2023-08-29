import React, { useState, useEffect } from 'react';
import files from 'settings/files.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './Categories.css';

function Categories() {
    const getOrganizedData = () => {
        const organizedData = {};
        Object.keys(files).map(filename => {
            const entry = files[filename];
            const category = entry.category;

            if (!organizedData[category]) {
                organizedData[category] = [];
            }

            organizedData[category].push(filename);
        })

        return Object.keys(organizedData).map((category, index) => {
            const filenames = organizedData[category];
            return (
                <div key={index}>
                    <div className='category-layer1'>
                        {category}
                    </div>
                    {filenames.map((filename, index) => (
                        <div key={index}>
                            {filename}
                        </div>
                    ))}
                </div>
            )

        });
    }
    return (
        <div className='categories-container'>
            {getOrganizedData()}
        </div>
    )
}

export default Categories;
