import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import { Column, TaskModal} from "../components";

import { tasks } from "../testData";

import './pages.css';

export default function TasksPage(){
    const [fullTasks, setFullTasks] = useState(tasks);
    const [showTask, setShowTask] = useState(false);
    const [showId, setShowId] = useState();

    function updateTasks(newTasks){
        setFullTasks(newTasks);
    }

    function onToTask(id){
        setShowId(id);
        setShowTask(true);
    }

    return (
        <>
            <TaskModal showTask = {showTask} task={fullTasks.filter(i => i.id === showId)[0]} onClose = {() => setShowTask(false)} />
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