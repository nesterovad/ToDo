import React from "react";

import './styles.css';

/**
 * Компонент предпросмотра проекта
 * @param {object} props  - project - объект проекта, onDelete(id) - функция удаления проекта, onEdit(id) - функция перехода к редактированию проекта
 * @returns 
 */
export default function Project(props){
    function onDelete(){
        props.onDelete(props.project.id);
    }

    function onEdit(){
        props.onEdit(props.project.id);
    }

    return (
        <div className="proj">
            <header style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                <button className="projButton" onClick={onEdit}>Edit</button>
                <button className="projButton" onClick={onDelete}>Delete</button>
            </header>
            <h4 className="taskHeader">{props.project.name}</h4>
        </div>
    )
}