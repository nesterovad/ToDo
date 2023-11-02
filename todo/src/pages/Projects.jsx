import React, { Component, useState } from "react";

import { projects } from "../testData";

import './pages.css';

/**
 * Страница проектов
 * @returns {Component}
 */
export default function Projects(){
    const [projects, setProjects] = useState(projects);

    function renderProjects(){

    }

    return(
        <>
            <div style={{display: 'grid', gridTemplate: '30% 30% 30%'}}>

            </div>
        </>
    )

}