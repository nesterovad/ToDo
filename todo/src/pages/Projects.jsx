import React, { Component, useState } from "react";
import {useSelector} from 'react-redux';

import { Project, EditProjectModal } from "../components";

import { projectsData } from "../testData";

import './pages.css';

/**
 * Страница проектов
 * @returns {Component}
 */
export default function Projects(){
   // const [projects, setProjects] = useState(projectsData);
   const projects = useSelector(state => state.projects);
    const [showEdit, setShowEdit] = useState(false);
    const [projTemplate, setProjTemplate] = useState({
                                                        id: projects.length,
                                                        name: ''
                                                    });

    function onDelete(id){
        let tmp = projects.filter(i => i.id !== id);
       // setProjects(tmp);
    }

    function renderProjects(){
        return (
            <>
                {projects.map(i => <Project project={i} onDelete={onDelete} onEdit={onToEdit}/>)}
            </>
        )
    }

    function onClose(){
        setShowEdit(false);
        setProjTemplate({
            id: projects.length,
            name: ''
        });
    }

    function onToEdit(id){
        let tmp = projects.filter(i => i.id === id);
        setProjTemplate(tmp[0]);
        setShowEdit(true);
    }

    function onSave(proj){
        let tmp = projects.filter(i => i.id !== proj.id);
        tmp.push(proj);
        //setProjects(tmp);
        setShowEdit(false);
        setProjTemplate({
            id: projects.length,
            name: ''
        });
    }

    function onAdd(){
        setShowEdit(true);
    }

    return(
        <>
            <EditProjectModal showModal={showEdit} onClose={onClose} project={projTemplate} onSave={onSave} />
            <div style={{display: 'grid', gridTemplateColumns: '30% 30% 30%'}}>
                {renderProjects()}
            </div>
            <button className="button" onClick={onAdd}>Create</button>
        </>
    )

}