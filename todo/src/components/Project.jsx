import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { projectDeleted } from "../store/projectsSlice";

import api from "../backend/backend";

import './styles.css';

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
        api("project", "delete", props.project);
    }

    return (
        <div className="proj">
            <header style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                <button className="projButton" ><Link to={`/editProject/${props.project.id}`} state = {{previousLocation: props.location}} >Edit</Link></button>
                <button className="projButton" onClick={onDelete}>Delete</button>
            </header>
            <Link to={`/project/${props.project.id}`} ><h4 className="taskHeader">{props.project.name}</h4></Link>
        </div>
    )
}