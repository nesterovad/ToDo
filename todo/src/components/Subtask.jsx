import React, { Component, useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import './styles.css';

/**
 * Интеративный компонент подзадачи, позволяет менять статус кликом на иконку
 * @param {object} props - Объект подзадачи subtask и функция обновления статуса updateSubtask
 * @returns {Component} - Компонент подзадачи
 */
function Subtask(props){
    const [subtask, setSubtaks] = useState(props.subtask);

    function changeStatus(){
        let tmp = subtask;
        if (subtask.status === 'new'){
            tmp.status = 'in process';
        }else if (subtask.status === 'in process'){
            tmp.status = 'done';
        }else{
            tmp.status = 'new';
        }
        setSubtaks(tmp);
        props.updateSubtask(tmp);
    }

    function renderStatus(){
        if (subtask.status === 'new'){
            return (
                <div className="subtaskStatus" onClick={changeStatus} />
            )
        }else if (subtask.status === 'in process'){
            return (
                <div className="subtaskStatus" onClick={changeStatus}>
                    <CircleOutlinedIcon color='primary' sx={{fontSize: 16}} />
                </div>
            )
        }else{
            return (
                <div className="subtaskStatus" onClick={changeStatus}>
                    <CheckOutlinedIcon color='success' sx={{fontSize: 16}} />
                </div>
            )
        }
    }

    return (
        <div className='subtask'>
            {renderStatus()}
            <p className="subtaskName">{subtask.name}</p>
        </div>
    )
}

/**
 * Компонент создания, удаления и редактирования подзадачи
 * @param {object} props - объект подзадачи subtask, функция сохранения изменений saveSubtask, функция удаления deleteSubtask 
 * @returns {Component}
 */
function EditSubtask(props){
    const [name, setName] = useState(props.subtask.name);
    const [status, setStatus] = useState(props.subtask.status);

    function onNameChange(e){
        setName(e.target.value);
    }

    function onStatusChange(e){
        setStatus(e.target.value);
    }

    function onSave(){
        let subtask = {
            id: props.subtask.id,
            name: name,
            status: status
        };
        props.saveSubtask(subtask);
    }

    return (
        <div className="editSubtask">
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <p className="text">Name</p>
                <input type="text" className="modalInput" value={name} onChange={onNameChange} placeholder="Name of the subtask" />
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <p className="text">
                    <input type='radio' name='status' value='new' checked={status === 'new' ? true : false} onChange={onStatusChange} />
                    New
                </p>
                <p className="text">
                    <input type='radio' name='status' value='in process' checked={status === 'in process' ? true : false} onChange={onStatusChange} />
                    In process
                </p>
                <p className="text">
                    <input type='radio' name='status' value='done' checked={status === 'done' ? true : false} onChange={onStatusChange} />
                    Done
                </p>
                
            </div>
            <button className="modalButton" onClick={onSave}>Save</button>
        </div>
    )
}

export {Subtask, EditSubtask}