import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {isMobile} from "react-device-detect";

import { Column, Search} from "../components";

import './pages.css';
import api from "../backend/backend";
import { tasksAdded } from "../store/tasksSlice";

/**
 * Страница задач
 * @returns {Component}
 */
export default function TasksPage(){
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    let tasks = api("tasks", "get", id).data;
        dispatch(
            tasksAdded(tasks)
        );
    const backend = isMobile ? TouchBackend : HTML5Backend ;

    return (
        <>        
            <Search projId={id} location={location}/>
            <DndProvider backend={backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={tasks} location = {location}/>
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={tasks} location = {location}/>
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={tasks} location = {location}/>
                    </div>
                </div>  
            </DndProvider>
            <button><Link to={`/project/${id}/createTask`} state={{previousLocation: location}}>New task</Link></button>
        </>
    )
}