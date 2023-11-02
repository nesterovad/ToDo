import React, { Component, useState } from "react";

import { Project } from "../components";

import { projectsData } from "../testData";

import './pages.css';

/**
 * Страница проектов
 * @returns {Component}
 */
export default function Projects(){
    const [projects, setProjects] = useState(projectsData);
    const [showEdit, setShowEdit] = useState(false);

    function onDelete(id){
        let tmp = projects.filter(i => i.id !== id);
        setProjects(tmp);
    }

    function renderProjects(){
        return (
            <>
                {projects.map(i => <Project project={i} onDelete={onDelete} />)}
            </>
        )
    }

    return(
        <>
            <div style={{display: 'grid', gridTemplateColumns: '30% 30% 30%'}}>
                {renderProjects()}
            </div>
        </>
    )

}