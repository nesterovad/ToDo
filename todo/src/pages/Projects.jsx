import React, { Component, useState } from "react";
import {useSelector} from 'react-redux';

import { Project, EditProjectModal } from "../components";

import api from "../backend/backend";

import { useDispatch } from "react-redux";
import { projectsAdded } from "../store/projectsSlice";

import './pages.css';

/**
 * Страница проектов
 * @returns {Component}
 */
export default function Projects(){
   const dispatch = useDispatch();
   let projects = api("projects", "get").data;
   dispatch(
    projectsAdded(projects)
    );

    const [showEdit, setShowEdit] = useState(false);
    const [projTemplate, setProjTemplate] = useState({
                                                        id: projects.length,
                                                        name: ''
                                                    });
    const [isEdit, setIsEdit] = useState(false);

    

    function renderProjects(){
        return (
            <>
                {projects.map(i => <Project project={i} onEdit={onToEdit}/>)}
            </>
        )
    }

    function onClose(){
        setShowEdit(false);
    }

    function onToEdit(id){
        let tmp = projects.filter(i => i.id === id);
        setProjTemplate(tmp[0]);
        setIsEdit(true);
        setShowEdit(true);
    }

    function onAdd(){
        setIsEdit(false);
        setShowEdit(true);
    }

    return(
        <>
            <EditProjectModal showModal={showEdit} onClose={onClose} project={projTemplate} isEdit={isEdit}/>
            <div style={{display: 'grid', gridTemplateColumns: '30% 30% 30%'}}>
                {renderProjects()}
            </div>
            <button className="button" onClick={onAdd}>Create</button>
        </>
    )

}