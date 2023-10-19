import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import { Column, TaskModal} from "../components";

import { shortTasks, tasks } from "../testData";

import './pages.css';

export default function TasksPage(){
    const [ptasks, setPTasks] = useState(shortTasks);
    const [fullTasks, setFullTasks] = useState(tasks);
    const [showTask, setShowTask] = useState(true);

    function updateTasks(newTasks){
        setPTasks(newTasks);

       // console.log(tasks);
    }

    return (
        <>
            <TaskModal showTask = {showTask} task={fullTasks[0]} onClose = {() => setShowTask(false)} />
            <DndProvider backend={HTML5Backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={ptasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={ptasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={ptasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                </div>  
            </DndProvider>
        </>
    )
}