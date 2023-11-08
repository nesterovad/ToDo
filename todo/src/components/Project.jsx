import React from "react";
import { Link } from "react-router-dom";

import { projectDeleted } from "../store/projectsSlice";

import './styles.css';
import { useDispatch } from "react-redux";

/**
 * Компонент предпросмотра проекта
 * @param {object} props  - project - объект проекта, onDelete(id) - функция удаления проекта, onEdit(id) - функция перехода к редактированию проекта
 * @returns 
 */
export default function Project(props){
    const dispatch = useDispatch();

    function onDelete(){
        dispatch(
            projectDeleted(props.project.id)
        );
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
            <Link to="/project" ><h4 className="taskHeader">{props.project.name}</h4></Link>
        </div>
    )
}