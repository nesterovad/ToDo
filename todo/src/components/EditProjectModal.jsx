import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { projectAdded, projectEdited } from "../store/projectsSlice";

import Modal from "./Modal";

import api from "../backend/backend";

import './styles.css';

/**
 * Компонент создания и редактирования проекта
 * @param {object} props - project - объект проекта, onSave(project) - функция сохранения проекта, onClose() - функция закрытия модального окна 
 * @returns 
 */
export default function EditProjectModal(props){
    const navigate = useNavigate();
    const id = useParams();
    let project;
    if (id.id != undefined){
        const tmp = api("project", "get", id.id);
       if (tmp.status === '200'){
            
            project = tmp.data;
        }
    }
    const [name, setName] = useState(() => {
        if (project){
            return project.name;
        }     
        else return "";
    });
   
    const dispatch = useDispatch();
    
    function onNameChange(e){
        setName(e.target.value);
    }

    function onSave(){
        
        if(project){
            let proj = {
                id: project.id,
                name: name
            };
            dispatch(
                projectEdited(proj)
            );
           let res = api('project', 'update', proj);
        }else{
            let proj = {
                
                name: name
            };
            dispatch(
                projectAdded(proj)
            );
            api('project', 'post', proj);
        }
        setName('');
        navigate('/');
        
    }
    
    return (
        <Modal onClose={() => navigate('/')}>
            <h4 className="taskHeader">{project ? ('Edit project ' + project.name) : 'New project'}</h4>
            <div className="modalField">
                <p className="text">Project name</p>
                <input type='text' className="modalInput" value={name}  onChange={onNameChange} />
            </div>
            <button className="projButton" onClick={onSave}>Save</button>
        </Modal>
    )
}