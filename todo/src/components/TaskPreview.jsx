import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

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
            <Link to={`/project/${props.task.projId}/${props.task.id}`} state={{previousLocation: props.location}}>
                <h4 className="taskHeader">{props.task.name}</h4>
            </Link>
            
        </div>
    )
}