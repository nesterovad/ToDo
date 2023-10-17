import React, { useState } from "react";
import { useDrop } from "react-dnd";

import TaskPreview from "./TaskPreview";

import './styles.css';

export default function Column(props){
    const [tasks, setTasks] = useState(props.tasks);
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => update(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    function update(id){
        let newStatus = props.name;
        let updatedTask = tasks.filter(i => i.id === id);
        let tmp = tasks.filter(i => i.id !== id);
        updatedTask[0].status = newStatus;
        tmp.push(updatedTask[0]);
        props.update(tmp);
       // setTasks(tmp);
        console.log(tasks);
        
    }

    function previewTasks(status){
        return (
            <>
                {tasks.filter(i => i.status.toUpperCase() === status.toUpperCase()).map(item =>
                        <TaskPreview task = {item} />
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