import React, { useState } from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import { Column, TaskPreview } from "../components";

import { shortTasks } from "../testData";

import './pages.css';

export default function TasksPage(){
    const [tasks, setTasks] = useState(shortTasks);

    function updateTasks(newTasks){
        setTasks(newTasks);
       // console.log(tasks);
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="wrapper">
                    <div className="col">
                        <Column name = 'New' tasks={tasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                    <div className="col">
                        <Column name = 'In progress' tasks={tasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                    <div className="col">
                        <Column name = 'Done' tasks={tasks} update={updateTasks}>
                            
                        </Column>
                    </div>
                </div>  
            </DndProvider>
        </>
    )
}