import React, { useState } from "react";
import { useDrop } from "react-dnd";


import TaskPreview from "./TaskPreview";

import './styles.css';

export default function Column(props){
    //const [tasks, setTasks] = useState(props.tasks);
    const tasks = props.tasks;
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => update(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    function update(id){
       /* let newStatus = props.name;
        let updatedTask = tasks.filter(i => i.id === id);
        let tmp = tasks.filter(i => i.id !== id);
        let prevStatus = updatedTask[0].status;
        updatedTask[0].status = newStatus;
        let updated = updateDate(updatedTask[0], prevStatus);
        tmp.push(updated);
        props.update(tmp);
        */
    }

    function updateDate(task, prevStatus){
       
        if ((prevStatus.toUpperCase() === 'DONE') && (task.status.toUpperCase() !== 'DONE')){
            task.finishDate = undefined;
        }
        if ((prevStatus.toUpperCase() !== 'DONE') && (task.status.toUpperCase() === 'DONE')){
            task.finishDate = new Date();
        }
        if (task.status.toUpperCase() === 'NEW'){
            task.startDate = undefined;
        }
        if ((prevStatus.toUpperCase() !== 'IN PROGRESS') && (task.status.toUpperCase() === 'IN PROGRESS')){
            task.startDate = new Date();
        }
        return task;
    }

    function previewTasks(status){
        return (
            <>
                {tasks.filter(i => i.status.toUpperCase() === status.toUpperCase()).map(item =>
                        <TaskPreview task = {item} toTask={props.toTask}/>
                    )}
            </>
        )
    }

    return (
        <div className="column" ref={drop}>
            <h3 className="columnName">{props.name}</h3>
            {previewTasks(props.name)}
        </div>
    )
}