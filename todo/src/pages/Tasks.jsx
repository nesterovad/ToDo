import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import { Column, TaskModal, Search, SearchResults} from "../components";

import { tasks } from "../testData";

import './pages.css';

export default function TasksPage(){
    const [fullTasks, setFullTasks] = useState(tasks);
    const [showTask, setShowTask] = useState(false);
    const [showId, setShowId] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [res, setRes] = useState([]);

    function updateTasks(newTasks){
        setFullTasks(newTasks);
    }

    function onToTask(id){
        setShowId(id);
        setShowSearch(false);
        setShowTask(true);
    }

    function onSearch(text){
        let res = fullTasks.filter(i => (i.id.toString() === text) || (i.name === text));
        setRes(res);
        setSearch(text);
        setShowSearch(true);
    }

    return (
        <>
            <TaskModal showTask = {showTask} task={fullTasks.filter(i => i.id === showId)[0]} onClose = {() => setShowTask(false)} />
            <SearchResults showRes={showSearch} tasks={res} toTask={onToTask} search={search} onClose={() => setShowSearch(false)}/>
            <Search onSearch={onSearch} />
            <DndProvider backend={HTML5Backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={fullTasks} update={updateTasks} toTask={onToTask} />
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={fullTasks} update={updateTasks} toTask={onToTask} />
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={fullTasks} update={updateTasks} toTask={onToTask} />
                    </div>
                </div>  
            </DndProvider>
        </>
    )
}