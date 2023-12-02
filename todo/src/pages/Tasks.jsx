import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import { Column, TaskModal, Search, SearchResults, EditTaskModal} from "../components";

import { tasks } from "../testData";

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
    const [showTask, setShowTask] = useState(false);
    const [showId, setShowId] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [res, setRes] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    let newtask = {
        
        name: undefined,
        descriprion: undefined,
        status: 'new',
        createDate: new Date(),
        priority: 'low',
        finishDate: undefined,
        endDate: undefined,
        startDate: undefined,
        subtasks:[],
        comments:[],
        files:[]
    };
    const [taskToEdit, settaskToEdit] = useState(newtask);
    const [isEdit, setIsEdit] = useState(false);
    let tasks = api("tasks", "get", id).data;
        dispatch(
            tasksAdded(tasks)
        );
    

    //const tasks = useSelector(state => state.tasks.filter(task => task.projId == id));
    
    function onToTask(id){
        setShowId(id);
        setShowSearch(false);
        setShowTask(true);
    }

    function onSearch(text){
        let res = tasks.filter(i => (i.id.toString() === text) || (i.name === text));
        setRes(res);
        setSearch(text);
        setShowSearch(true);
        
    }

    function onToEditTask(id){
        let task = tasks.find(i => i.id === id);
        settaskToEdit(task);
        setIsEdit(true);
        setShowEdit(true);
    }

    function onCreateTask(){
        let newtask = {
            id: tasks.length,
            name: undefined,
            descriprion: undefined,
            status: 'new',
            createDate: new Date(),
            priority: 'low',
            finishDate: undefined,
            endDate: undefined,
            startDate: undefined,
            subtasks:[],
            comments:[],
            files:[]
        };
        settaskToEdit(newtask);
        setShowEdit(true);
    }
   
    return (
        <>
           
            <SearchResults showRes={showSearch} tasks={res} toTask={onToTask} search={search} onClose={() => setShowSearch(false)}/>
            
            <Search onSearch={onSearch} />
            <DndProvider backend={HTML5Backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={tasks} toTask={onToTask} location = {location}/>
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={tasks} toTask={onToTask} location = {location}/>
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={tasks} toTask={onToTask} location = {location}/>
                    </div>
                </div>  
            </DndProvider>
            <button onClick = {onCreateTask}><Link to={`/project/${id}/createTask`} state={{previousLocation: location}}>New task</Link></button>
        </>
    )
}