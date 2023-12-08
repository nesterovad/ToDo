import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

import './styles.css';

/**
 * Компонент предпросмотра задачи, участвует в drag-n-drop, при нажатии открывает модальное окно просмотра задачи
 * @param {object} props - task - объект задачи, location - данные location cnhfybws
 * @returns 
 */
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