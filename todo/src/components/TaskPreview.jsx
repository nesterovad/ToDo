import React from "react";
import { useDrag } from "react-dnd";

import './styles.css';

export default function TaskPreview(props){
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'TASK',
        item: {id: props.task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div className="taskPreview" ref={drag}>
            <h4 className="taskHeader">{props.task.name}</h4>
        </div>
    )
}