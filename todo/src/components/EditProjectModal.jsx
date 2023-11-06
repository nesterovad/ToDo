import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { projectAdded, projectEdited } from "../store/projectsSlice";

import Modal from "./Modal";

import './styles.css';

/**
 * Компонент создания и редактирования проекта
 * @param {object} props - project - объект проекта, onSave(project) - функция сохранения проекта, onClose() - функция закрытия модального окна 
 * @returns 
 */
export default function EditProjectModal(props){
    const project = useSelector(state => state.projects.find(project => project.id === props.project.id));
    function initName(){
        if(project){
            return project.name;
        }else{
            return '';
        }
    }
    const [name, setName] = useState(() => initName());
    const [isExist, setIsExist] = useState(props.isEdit);
    const dispatch = useDispatch();
    

    if(!props.showModal){
        return null;
    }
    
    function onNameChange(e){
        setName(e.target.value);
    }

    function onSave(){
        let proj = {
            id: props.project.id,
            name: name
        };
        if(props.isEdit){
            dispatch(
                projectEdited(proj)
            );
        }else{
            dispatch(
                projectAdded(proj)
            );
        }
        setName('');
        props.onClose();
        
    }

    return (
        <Modal showModal={props.showModal} onClose={props.onClose}>
            <h4 className="taskHeader">{project ? ('Edit project ' + project.name) : 'New project'}</h4>
            <div className="modalField">
                <p className="text">Project name</p>
                <input type='text' className="modalInput" value={name}  onChange={onNameChange} />
            </div>
            <button className="projButton" onClick={onSave}>Save</button>
        </Modal>
    )
}