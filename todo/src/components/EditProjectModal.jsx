import React, { useState } from "react";

import Modal from "./Modal";

import './styles.css';

/**
 * Компонент создания и редактирования проекта
 * @param {object} props - project - объект проекта, onSave(project) - функция сохранения проекта, onClose() - функция закрытия модального окна 
 * @returns 
 */
export default function EditProjectModal(props){
    const [name, setName] = useState(props.project.name);

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
        }
        props.onSave(proj);
    }

    return (
        <Modal showModal={props.showModal} onClose={props.onClose}>
            <h4 className="taskHeader">{props.project.name ? 'Edit project' : 'New project'}</h4>
            <div className="modalField">
                <p className="text">Project name</p>
                <input type='text' className="modalInput" value={name}  onChange={onNameChange} />
            </div>
            <button className="projButton" onClick={onSave}>Save</button>
        </Modal>
    )
}