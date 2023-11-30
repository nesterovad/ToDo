import React, { Component, useState } from "react";
import {useSelector} from 'react-redux';

import { Project, EditProjectModal } from "../components";

import api from "../backend/backend";

import { useDispatch } from "react-redux";
import { projectsAdded } from "../store/projectsSlice";

import './pages.css';
import { Link, useLocation } from "react-router-dom";

/**
 * Страница проектов
 * @returns {Component}
 */
export default function Projects(){
   const dispatch = useDispatch();
   const location = useLocation();
   let projects = api("projects", "get").data;
   dispatch(
    projectsAdded(projects)
    );    

    function renderProjects(){
        return (
            <>
                {projects.map(i => <Project project={i} location={location}/>)}
            </>
        )
    }

    return(
        <>            
            <div style={{display: 'grid', gridTemplateColumns: '30% 30% 30%'}}>
                {renderProjects()}
            </div>
            <button className="button"><Link to="/createProject/" state={{previousLocation: location}}>Create</Link></button>
        </>
    )

}