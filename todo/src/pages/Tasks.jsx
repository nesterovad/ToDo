import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Column, TaskModal, Search, SearchResults, EditTaskModal} from "../components";

import { tasks } from "../testData";

import './pages.css';

/**
 * Страница задач
 * @returns {Component}
 */
export default function TasksPage(){
    const {id} = useParams();
    const tasks = useSelector(state => state.tasks.filter(task => task.projId == id));
    const [showTask, setShowTask] = useState(false);
    const [showId, setShowId] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [res, setRes] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
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
    const [taskToEdit, settaskToEdit] = useState(newtask);
    const [isEdit, setIsEdit] = useState(false);

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
            <TaskModal showTask = {showTask} task={tasks.find(i => i.id === showId)} onClose = {() => setShowTask(false)} onEdit={onToEditTask}/>
            <SearchResults showRes={showSearch} tasks={res} toTask={onToTask} search={search} onClose={() => setShowSearch(false)}/>
            <EditTaskModal task={taskToEdit} showEdit={showEdit} onClose={() => setShowEdit(false)} isExist={isEdit}/>
            <Search onSearch={onSearch} />
            <DndProvider backend={HTML5Backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={tasks} toTask={onToTask} />
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={tasks} toTask={onToTask} />
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={tasks} toTask={onToTask} />
                    </div>
                </div>  
            </DndProvider>
            <button onClick = {onCreateTask}>New task</button>
        </>
    )
}